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
        user_prompt = state["prompt"]

        if not user_prompt.strip():
            return {"target_sections": AVAILABLE_SECTIONS}

        prompt = f"""You are a professional CV strategist and ATS optimization expert.

A user wants to improve their CV. Based on their instruction, determine which CV sections need to be rewritten.

Available sections: {json.dumps(AVAILABLE_SECTIONS)}

User instruction: "{user_prompt}"

Your job:
- Read the user instruction carefully.
- Identify which sections are explicitly or implicitly mentioned.
- If the user mentions "bullets", "responsibilities", or "work" → include "experience".
- If the user mentions "projects", "portfolio", or "side work" → include "projects".
- If the user mentions "intro", "profile", or "about" → include "summary".
- If the user mentions "awards", "activities", or "extracurricular" → include "achievements".
- If the user says "everything", "all", "full CV", or "whole" → return all sections.
- If no specific section is mentioned but a target role or improvement is implied → return all sections.

Return ONLY a valid JSON array of section names. No explanation, no markdown.
Example: ["summary", "experience"]
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
                f"  - Title: {exp.get('title', '')} | Company: {exp.get('company', '')} | Location: {exp.get('location', '')} | Duration: {exp.get('from', '')} to {exp.get('to', '')}\n    Bullets: {chr(10).join(f'      * {b}' for b in exp.get('bullets', []))}"
                for exp in data.get("experience", [])
            )
            input_lines.append(f"Experience:\n{experience_text}")
            json_shape_lines.append(
                '"experience": [{"title": "...", "company": "...", "location": "...", "from": "...", "to": "...", "bullets": ["...", "..."]}]'
            )

        if "achievements" in target_sections:
            achievements_text = "\n".join(
                f"  - Title: {ach.get('title', '')}\n    Details: {chr(10).join(f'      * {b}' for b in ach.get('bullets', []))}"
                for ach in data.get("achievements", [])
            )
            input_lines.append(f"Achievements:\n{achievements_text}")
            json_shape_lines.append(
                '"achievements": [{"title": "...", "bullets": ["...", "..."]}]'
            )

        if "projects" in target_sections:
            projects_text = "\n".join(
                f"  - Title: {proj.get('title', '')} | Year: {proj.get('year', '')}\n    Bullets: {chr(10).join(f'      * {b}' for b in proj.get('bullets', []))}"
                for proj in data.get("projects", [])
            )
            input_lines.append(f"Projects:\n{projects_text}")
            json_shape_lines.append(
                '"projects": [{"title": "...", "year": "...", "bullets": ["...", "..."]}]'
            )

        json_shape = "{\n  " + ",\n  ".join(json_shape_lines) + "\n}"

        prompt = f"""You are a senior CV writer and ATS optimization specialist with 10+ years of experience helping candidates land interviews at top tech companies.

USER INSTRUCTION: "{user_prompt if user_prompt else 'Improve the CV to be professional and ATS-friendly.'}"

YOUR TASK:
Rewrite the provided CV sections to be ATS-optimized, role-targeted, and compelling to hiring managers.

STRICT RULES — follow every one of these:

1. NEVER invent facts, companies, job titles, dates, or credentials that are not in the input.
2. NEVER remove or change: title, company, location, from, to, year fields — copy them exactly.
3. NEVER add new experience entries or project entries — keep the same count.
4. Keep the same number of bullet points per entry as the input.

ATS OPTIMIZATION RULES:
5. Use strong, specific action verbs to start every bullet (Built, Designed, Implemented, Optimized, Automated, Developed, Architected, Reduced, Increased, Led, Delivered).
6. Follow the format: [Action Verb] + [What you did] + [Technology/Method used] + [Result or Impact if available].
   Example: "Developed a real-time WhatsApp chatbot using LangGraph and FastAPI, reducing response time by 40%."
7. Include relevant technical keywords naturally — do not keyword-stuff.
8. Quantify results wherever the input gives any hint of scale, speed, users, or improvement.
9. Remove filler phrases like "responsible for", "worked on", "helped with", "assisted in".
10. Use present tense for current roles, past tense for previous roles.

SUMMARY RULES:
11. Write exactly 2-3 sentences.
12. Sentence 1: Who you are + years of experience + main expertise.
13. Sentence 2: What you specialize in + key technologies.
14. Sentence 3: What you bring to the team or your career goal aligned with the target role.
15. Mirror the language and keywords from the user's target role if mentioned.
16. No first-person pronouns (no "I", "my", "me").
17. Also dont add texts like x in quanity like unknown figures 
OUTPUT FORMAT:
Return ONLY a valid JSON object with exactly these keys:
{json_shape}

No markdown. No explanation. No commentary. Just the JSON object.

CV DATA TO IMPROVE:
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