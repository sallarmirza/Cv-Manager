from pydantic import BaseModel, Field

class PersonalInfo(BaseModel):
    firstName: str = ""
    lastName: str = ""
    location: str = ""
    phone: str = ""
    email: str = ""
    linkedin: str = ""

class Experience(BaseModel):
    title: str = ""
    company: str = ""
    location: str = ""
    from_: str = Field(default="", alias="from")
    to: str = ""
    bullets: list[str] = []

    model_config = {"populate_by_name": True}

class Education(BaseModel):
    degree: str = ""
    institution: str = ""
    location: str = ""
    from_: str = Field(default="", alias="from")
    to: str = ""

    model_config = {"populate_by_name": True}

class Project(BaseModel):
    title: str = ""
    year: str = ""
    bullets: list[str] = []

class Skill(BaseModel):
    category: str = ""
    items: str = ""

class Language(BaseModel):
    language: str = ""
    proficiency: str = ""

class Achievement(BaseModel):
    title: str = ""
    bullets: list[str] = []

class CvRequest(BaseModel):
    prompt: str = ""
    personal: PersonalInfo = PersonalInfo()
    summary: str = ""
    experience: list[Experience] = []
    education: list[Education] = []
    projects: list[Project] = []
    skills: list[Skill] = []
    certifications: list[str] = []
    languages: list[Language] = []
    achievements: list[Achievement] = []

class CvResponse(BaseModel):
    personal: PersonalInfo
    summary: str
    experience: list[Experience]
    education: list[Education]
    projects: list[Project]
    skills: list[Skill]
    certifications: list[str]
    languages: list[Language]
    achievements: list[Achievement]

    model_config = {"populate_by_name": True}