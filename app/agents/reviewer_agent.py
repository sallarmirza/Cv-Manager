# review the file 
from fastapi import APIRouter,Request
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph
from typing import TypedDict

review_model=ChatOllama()

class State(TypedDict):
    input:str

# stategraph
# clean->check factors->respond
