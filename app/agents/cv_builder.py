import os
import json
import re
from dataclasses import dataclass, field
from typing import Optional, TypedDict
from pathlib import Path
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph
from schemas.cv_schema import CvRequest, CvResponse
from fastapi import APIRouter, HTTPException

load_dotenv(Path(__file__).parent.parent / ".env")


router = APIRouter(tags=["cv"], prefix="/api/cv")

@dataclass
class AgentConfig:
    model: str = field(default_factory=lambda: os.getenv("GEMINI_MODEL", "gemini-1.5-flash"))
    api_key: str = field(default_factory=lambda: os.getenv("GEMINI_KEY", ""))
    temperature: float = 0.3


class Agent:
    def __init__(self, config: Optional[AgentConfig] = None):
        self.config = config or AgentConfig()
        if not self.config.api_key:
            raise ValueError("GEMINI_KEY environment variable is not set.")
        self.model = ChatGoogleGenerativeAI(
            model=self.config.model,
            google_api_key=self.config.api_key,
            temperature=self.config.temperature,
        )


AVAILABLE_SECTIONS = ["summary", "experience", "achievements", "projects"]


class CvState(TypedDict):
    raw: dict
    prompt: str
    target_sections: list[str] 
    improved: dict
    final: dict


class CvTasks:
    def __init__(self, agent: Agent):
        self.agent = agent

    def plan_sections(self, state: CvState) -> dict:
        """Ask the LLM which sections the user wants improved based on their prompt."""
        user_prompt = state["prompt"]

        if not user_prompt.strip():
            return {"target_sections": AVAILABLE_SECTIONS}

        prompt = f"""You are a CV assistant. Based on the user's instruction, decide which CV sections need to be improved.

Available sections: {json.dumps(AVAILABLE_SECTIONS)}

User instruction: "{user_prompt}"

Return a JSON array of section names to improve. Only include sections the user explicitly or implicitly wants changed.
Examples:
- "make my summary more professional" ["summary"]
- "improve the bullet points"  ["experience", "achievements", "projects"]
- "rewrite everything"  ["summary", "experience", "achievements", "projects"]
- "fix my experience and projects"  ["experience", "projects"]

Return ONLY a JSON array, nothing else. Example: ["summary", "experience"]
"""
        response = self.agent.model.invoke(prompt)
        raw_text: str = response.content if hasattr(response, "content") else str(response)
        raw_text = re.sub(r"```(?:json)?|```", "", raw_text).strip()

        try:
            sections = json.loads(raw_text)
            sections = [s for s in sections if s in AVAILABLE_SECTIONS]
        except (json.JSONDecodeError, TypeError):
            sections = AVAILABLE_SECTIONS

        return {"target_sections": sections}

    def improve_content(self, state: CvState) -> dict:
        data = state["raw"]
        user_prompt = state["prompt"]
        target_sections = state["target_sections"]

        if not target_sections:
            return {"improved": {}}

        input_lines = []
        json_shape_lines = []

        if "summary" in target_sections:
            input_lines.append(f'Summary: {data.get("summary", "")}')
            json_shape_lines.append('"summary": "improved summary string"')

        if "experience" in target_sections:
            experience_text = "\n".join(
                f"  - {exp.get('title', '')} at {exp.get('company', '')} ({exp.get('from', '')} - {exp.get('to', '')}), {exp.get('location', '')}: {', '.join(exp.get('bullets', []))}"
                for exp in data.get("experience", [])
            )
            input_lines.append(f"Experience:\n{experience_text}")
            json_shape_lines.append(
                '"experience": [{"title": "...", "company": "...", "location": "...", "from": "...", "to": "...", "bullets": ["...", "..."]}]'
            )

        if "achievements" in target_sections:
            achievements_text = "\n".join(
                f"  - {ach.get('title', '')}: {', '.join(ach.get('bullets', []))}"
                for ach in data.get("achievements", [])
            )
            input_lines.append(f"Achievements:\n{achievements_text}")
            json_shape_lines.append(
                '"achievements": [{"title": "...", "bullets": ["...", "..."]}]'
            )

        if "projects" in target_sections:
            projects_text = "\n".join(
                f"  - {proj.get('title', '')} ({proj.get('year', '')}): {', '.join(proj.get('bullets', []))}"
                for proj in data.get("projects", [])
            )
            input_lines.append(f"Projects:\n{projects_text}")
            json_shape_lines.append(
                '"projects": [{"title": "...", "year": "...", "bullets": ["...", "..."]}]'
            )

        json_shape = "{\n  " + ",\n  ".join(json_shape_lines) + "\n}"

        prompt = f"""You are an expert ATS resume writer.

User instruction: {user_prompt if user_prompt else "Improve the CV to be more professional and ATS-friendly."}

Rewrite ONLY the sections provided below. Return valid JSON with exactly these keys:
{json_shape}

Rules:
- Do NOT invent new facts, companies, dates, or credentials.
- Use strong action verbs and quantify results where data is already present.
- Preserve all original fields (title, company, location, from, to, year) exactly as given.
- Keep the same number of entries and bullets per entry.
- Return ONLY the JSON object, no markdown, no commentary.

INPUT:
{chr(10).join(input_lines)}
"""

        response = self.agent.model.invoke(prompt)
        raw_text: str = response.content if hasattr(response, "content") else str(response)
        raw_text = re.sub(r"```(?:json)?|```", "", raw_text).strip()

        try:
            improved = json.loads(raw_text)
        except json.JSONDecodeError:
            improved = {}

        return {"improved": improved}

    def merge_and_format(self, state: CvState) -> dict:
        raw = state["raw"]
        improved = state.get("improved", {})

        final = {
            "personal": raw.get("personal", {}),
            "summary": improved.get("summary") if "summary" in improved else raw.get("summary", ""),
            "experience": improved.get("experience") if "experience" in improved else raw.get("experience", []),
            "education": raw.get("education", []),
            "projects": improved.get("projects") if "projects" in improved else raw.get("projects", []),
            "skills": raw.get("skills", []),
            "certifications": raw.get("certifications", []),
            "languages": raw.get("languages", []),
            "achievements": improved.get("achievements") if "achievements" in improved else raw.get("achievements", []),
        }

        return {"final": final}


class CvWorkflow:
    def __init__(self, tasks: CvTasks):
        self.tasks = tasks
        self.graph = self._build()

    def _build(self):
        builder = StateGraph(CvState)
        builder.add_node("plan", self.tasks.plan_sections)
        builder.add_node("improve", self.tasks.improve_content)
        builder.add_node("merge", self.tasks.merge_and_format)
        builder.set_entry_point("plan")
        builder.add_edge("plan", "improve")
        builder.add_edge("improve", "merge")
        builder.set_finish_point("merge")
        return builder.compile()

    async def run(self, payload: dict, prompt: str) -> dict:
        result = await self.graph.ainvoke({
            "raw": payload,
            "prompt": prompt,
            "target_sections": [],
            "improved": {},
            "final": {},
        })
        return result.get("final", {})


agent_instance = Agent()
cv_tasks = CvTasks(agent_instance)
cv_pipeline = CvWorkflow(cv_tasks)

@router.post("/generate", response_model=CvResponse)
async def generate_cv(body: CvRequest):
    try:
        payload = body.model_dump(by_alias=True)
        prompt = payload.pop("prompt", "")
        result = await cv_pipeline.run(payload, prompt)
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
