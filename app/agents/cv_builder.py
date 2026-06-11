
import os
import re
from dataclasses import dataclass, field
from typing import Optional, TypedDict, Any

from fastapi import APIRouter, Request
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph

router = APIRouter(tags=["create-cv"], prefix="/gen")

@dataclass
class AgentConfig:
    model: str = field(default_factory=lambda: os.getenv("GEMINI_MODEL", "gemini-1.5-flash"))
    api_key: str = field(default_factory=lambda: os.getenv("GEMINI_KEY", ""))
    temperature: float = 0.2


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

class CvState(TypedDict):
    input: dict
    improved: dict   
    final_cv: dict



SECTION_PATTERN = re.compile(
    r"###\s*(SUMMARY|ACHIEVEMENTS|EXPERIENCE)\s*(.*?)(?=###\s*(?:SUMMARY|ACHIEVEMENTS|EXPERIENCE)|\Z)",
    re.S,
)


class CvTasks:
    def __init__(self, agent: Agent):
        self.agent = agent


    def _clean_value(self, value: Any) -> Any:
        """Recursively strip HTML tags, control characters, and extra whitespace."""
        if isinstance(value, str):
            value = re.sub(r"<[^>]+>", "", value)          
            value = re.sub(r"[\x00-\x1F\x7F]", "", value)  
            value = re.sub(r"\s+", " ", value).strip()
            return value or None

        if isinstance(value, list):
            cleaned = [self._clean_value(item) for item in value]
            return [item for item in cleaned if item is not None]

        if isinstance(value, dict):
            return {
                k: cleaned_v
                for k, v in value.items()
                if (cleaned_v := self._clean_value(v)) is not None
            }

        return value

    def clean_data(self, state: CvState) -> dict:
        return {"input": self._clean_value(state["input"])}


    def improve_content(self, state: CvState) -> dict:
        data = state["input"]

        prompt = f"""You are an expert ATS resume writer.
        Rewrite ONLY the sections below in professional ATS-optimised language.
        Do NOT invent new facts. Do NOT add extra commentary.

        Use EXACTLY these section headers (markdown h3):
        ### SUMMARY
        ### ACHIEVEMENTS
        ### EXPERIENCE

        INPUT:
        Summary: {data.get("summary", "")}
        Achievements: {data.get("achievements", "")}
        Experience: {data.get("experience", "")}
        """

        response = self.agent.model.invoke(prompt)
        raw_text: str = response.content if hasattr(response, "content") else str(response)

        sections: dict[str, str] = {}
        for match in SECTION_PATTERN.finditer(raw_text):
            key = match.group(1).lower()
            sections[key] = match.group(2).strip()

        return {"improved": sections}


    def format_cv(self, state: CvState) -> dict:
        data = state["input"]
        improved = state.get("improved", {})

        return {
            "final_cv": {
                "name": f"{data.get('firstName', '')} {data.get('lastName', '')}".strip(),
                "jobTitle": data.get("jobTitle"),
                "company": data.get("companyName"),
                "duration": f"{data.get('companyStartDate', '')} - {data.get('companyEndDate', '')}",
                "summary": improved.get("summary") or data.get("summary"),
                "achievements": improved.get("achievements") or data.get("achievements"),
                "experience": improved.get("experience") or data.get("experience"),
                "education": {
                    "degree": data.get("degreeName"),
                    "institute": data.get("instituteName"),
                    "duration": f"{data.get('eduStartDate', '')} - {data.get('eduEndDate', '')}",
                },
                "skills": data.get("skills", []),
            }
        }



class CvWorkflow:
    def __init__(self, tasks: CvTasks):
        self.tasks = tasks
        self.graph = self._build()

    def _build(self):
        builder = StateGraph(CvState)

        builder.add_node("clean", self.tasks.clean_data)
        builder.add_node("improve", self.tasks.improve_content)
        builder.add_node("format", self.tasks.format_cv)

        builder.set_entry_point("clean")
        builder.add_edge("clean", "improve")
        builder.add_edge("improve", "format")
        builder.set_finish_point("format")

        return builder.compile()

    async def run(self, input_data: dict) -> dict:
        result = await self.graph.ainvoke({"input": input_data})
        return result.get("final_cv", {})


agent_instance = Agent()
cv_service = CvTasks(agent_instance)
cv_pipeline = CvWorkflow(cv_service)


@router.post("/create-cv")
async def receive_cv(request: Request):
    body = await request.json()
    final_cv = await cv_pipeline.run(body)
    return final_cv

