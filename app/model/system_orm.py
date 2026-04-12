from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255))
    user_email = Column(String(255))
    hash_password = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow) 
    documents = relationship('Document', back_populates='owner')
    prompts = relationship('UserPrompt', back_populates='owner')

class Document(Base):
    __tablename__ = 'documents'
    
    doc_id = Column(Integer, primary_key=True, unique=True)
    doc_name = Column(String(255))
    content = Column(Text)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    thread_id = Column(String(255)) 
    uploaded_at = Column(DateTime, default=datetime.utcnow) 
    owner = relationship('User', back_populates="documents")

class UserPrompt(Base):
    __tablename__ = 'prompts'
    
    prompt_id = Column(Integer, primary_key=True)
    prompt_text = Column(Text)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates='prompts')