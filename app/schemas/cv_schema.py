from pydantic import BaseModel
from datetime import datetime

class CvRequest(BaseModel):
    user_id:int
    doc_id:int
    doc_text:str
    uploaded_at:datetime

class CvResponse(BaseModel):
    user_id:int
    doc_id:int
    doc_text:str
    created_at:datetime
    class config:
        from_attribute=True