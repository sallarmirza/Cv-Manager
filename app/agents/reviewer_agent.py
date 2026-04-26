from fastapi import APIRouter, Request
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph
from langchain_core.prompts import PromptTemplate
from typing import TypedDict
import json
import re

router = APIRouter()

review_model = ChatOllama(
    model='qwen2.5:3b',
    temperature=0.3,
)

# ---------------- STATE ----------------
class ReviewState(TypedDict):
    input: str
    review_data: dict
    score_data: dict
    final_cv: dict

# ---------------- NODES ----------------
def read_data(state):
    return {"input": state["input"]}

def review_node(state):

    cv_text = state["input"]
    prompt = f"""
    Review the CV below:

    {cv_text}

    Check for:
    - Professionalism
    - Seniority Level
    - Grammatical Mistakes
    """
    
    response = review_model.invoke(prompt)

    return {
        "review_data": {
            "review": response.content
        }
    }
def score_node(state):
    review_text = state["review_data"]["review"]

    prompt = f"""
Based on this CV review:

{review_text}

Return ONLY valid JSON. No explanation.

Format:
{{
  "score": number,
  "issues": [],
  "suggestions": []
}}
"""

    response = review_model.invoke(prompt)
    match = re.search(r'\{.*\}', response.content, re.DOTALL)
    json_str = match.group(0) if match else "{}"

    return {
        "score_data": json.loads(json_str)
    }

def final_node(state):
    return {
        "final_cv": {
            "review": state["review_data"]["review"],
            "score": state["score_data"].get("score", 0)
        }
    }

# ---------------- GRAPH ----------------
builder = StateGraph(ReviewState)

builder.add_node("read", read_data)
builder.add_node("review", review_node)
builder.add_node("score", score_node)
builder.add_node("final", final_node)

builder.set_entry_point("read")

builder.add_edge("read", "review")
builder.add_edge("review", "score")
builder.add_edge("score", "final")

graph = builder.compile()

# ---------------- API ----------------
@router.post('/review-cv')
async def review_cv(request: Request):
    data = await request.json()

    result = graph.invoke({
        "input": str(data)
    })

    return result["final_cv"]