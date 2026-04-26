from pydantic import BaseModel
from datetime import datetime,date
from typing import Optional

class CvRequest(BaseModel):
    user_id:Optional[int]=None
    doc_id:Optional[int]=None
    firstName: str
    lastName: str
    jobTitle: str
    company: str
    companyStartDate: str
    companyEndDate: str
    achievements: str
    instituteName: str
    degreeName: str
    eduStartDate: str
    eduEndDate: str
    skills: str

class CvResponse(BaseModel):
    user_id:int
    doc_id:int
    doc_text:str
    created_at:datetime
    class config:
        from_attribute=True