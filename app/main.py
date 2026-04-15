from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.system_orm import Base
from agents import cv_builder
app=FastAPI(title='CV Manager')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.get('/')
def root():
    return {"sucess":"System running successfully"}

app.include_router(cv_builder.router)