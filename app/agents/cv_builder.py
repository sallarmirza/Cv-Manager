from fastapi import APIRouter, Request
from langgraph.graph import StateGraph
from typing import TypedDict
from langchain_ollama import ChatOllama

router = APIRouter(tags=['create-cv'], prefix='/gen')

# llm
improvement_model=ChatOllama(
    model='qwen2.5:3b',
    temperature=0.3,
)

# STATE
class CvState(TypedDict):
    input: dict
    improved_data: dict
    final_cv: dict

#  NODES
def clean_data(state):
    return {"input": state["input"]}

def improve_content(state):
    data = state["input"]
    achievements=data.get('achievements')
    prompt=f"""Rewrite the achievements to more professional way and impactful way.Achivements:{achievements}"""

    response=improvement_model.invoke(prompt)
    improved={
        "achievements":response.content
    }
    return {"improved_data":improved}

def format_cv(state):
    data = state["input"]
    improved = state.get("improved_data", {})

    return {
        "final_cv": {
            "name": f"{data.get('firstName')} {data.get('lastName')}",
            "jobTitle": data.get("jobTitle"),
            "company": data.get("companyName"),
            "duration": f"{data.get('companyStartDate')} - {data.get('companyEndDate')}",
            "achievements": improved.get("achievements"),
            "education": {
                "degree": data.get("degreeName"),
                "institute": data.get("instituteName"),
                "duration": f"{data.get('eduStartDate')} - {data.get('eduEndDate')}"
            },
            "skills": data.get("skills")
        }
    }

# GRAPH
builder = StateGraph(CvState)

builder.add_node("clean", clean_data)
builder.add_node("improve", improve_content)
builder.add_node("format", format_cv)

builder.set_entry_point("clean")

builder.add_edge("clean", "improve")
builder.add_edge("improve", "format")

graph = builder.compile()

# API
@router.post('/create-cv')
async def receive_cv(request: Request):
    data = await request.json()

    result = graph.invoke({
        "input": data
    })

    return result["final_cv"]