print("=== MAIN.PY LOADED ===")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agents import cv_builder

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"message": "system running successfully"}

app.include_router(cv_builder.router)