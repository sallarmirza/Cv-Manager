# AI Resume Reviewer & CV Builder

An AI-powered web app that analyzes resumes and generates professional CVs.  
Built with **React** · **FastAPI** · **LangGraph** · **OpenAI**

🔗 **Live Demo:** _[add your Vercel URL after deploy]_  
📦 **Backend:** _[add your Render URL after deploy]_

---

## What it does

### Resume Reviewer
- User uploads a PDF resume
- LangGraph agent extracts info, scores each section, and generates actionable feedback
- Results shown as scores (1–10) with specific improvement tips per section

### CV Builder *(new feature)*
- User fills in a form (name, experience, skills, education, summary)
- LangGraph agent generates professional CV content from the inputs
- User can download the result as a formatted PDF

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Tailwind CSS |
| Backend | FastAPI + Python |
| AI / Agents | LangGraph + OpenAI GPT-4o |
| PDF parsing | PyPDF2 |
| PDF generation | ReportLab |
| Frontend deploy | Vercel |
| Backend deploy | Render (free tier) |

---

## Project Structure

```
resume-ai/
├── backend/
│   ├── main.py                  # FastAPI app, routes
│   ├── agents/
│   │   ├── reviewer_agent.py    # LangGraph resume review graph
│   │   └── cv_builder_agent.py  # LangGraph CV generation graph
│   ├── utils/
│   │   ├── pdf_extractor.py     # Extract text from uploaded PDF
│   │   └── pdf_generator.py     # Generate CV as downloadable PDF
│   ├── requirements.txt
│   └── .env                     # OPENAI_API_KEY (never commit this)
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── ReviewPage.jsx   # Upload resume, see feedback
    │   │   └── BuilderPage.jsx  # Fill form, generate + download CV
    │   ├── components/
    │   │   ├── UploadBox.jsx    # Drag & drop PDF upload
    │   │   ├── ScoreCard.jsx    # Section score display
    │   │   ├── FeedbackCard.jsx # Improvement tips display
    │   │   └── CVForm.jsx       # CV builder input form
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env                     # VITE_API_URL=http://localhost:8000
```

---

## API Endpoints

### `POST /analyze`
Accepts a PDF file upload. Returns scores and feedback.

**Request:** `multipart/form-data` with `file` field (PDF)

**Response:**
```json
{
  "name": "Salar Ahmed",
  "scores": {
    "summary": 7,
    "experience": 6,
    "skills": 8,
    "education": 9,
    "overall": 7
  },
  "feedback": {
    "summary": "Add measurable achievements. Avoid generic phrases like 'hardworking'.",
    "experience": "Use action verbs. Quantify results: 'Reduced load time by 40%'.",
    "skills": "Good tech stack. Consider adding tools like Docker or Git explicitly.",
    "education": "Looks good.",
    "top_suggestions": [
      "Add a GitHub link with projects",
      "Tailor your summary to each job you apply to",
      "Use bullet points, not paragraphs"
    ]
  }
}
```

---

### `POST /build-cv`
Accepts form data. Returns a downloadable PDF CV.

**Request body:**
```json
{
  "full_name": "Salar Ahmed Mirza",
  "email": "your@email.com",
  "phone": "+92-XXX-XXXXXXX",
  "location": "Pakistan",
  "summary": "Brief personal statement or leave blank for AI to generate",
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Company Name",
      "duration": "Jan 2023 – Present",
      "description": "What you did here"
    }
  ],
  "skills": ["React", "FastAPI", "LangGraph", "Python", "JavaScript"],
  "education": [
    {
      "degree": "BS Computer Science",
      "institution": "University Name",
      "year": "2022"
    }
  ]
}
```

**Response:** PDF file download

---

## LangGraph Agent Architecture

### Resume Reviewer Graph
```
[START]
   |
   v
extract_info        → pulls name, skills, experience, education from raw text
   |
   v
score_sections      → scores each section 1-10 using GPT-4o
   |
   v
generate_feedback   → writes specific improvement tips per section
   |
   v
[END] → returns structured JSON
```

### CV Builder Graph
```
[START]
   |
   v
enhance_summary     → rewrites/generates professional summary from user input
   |
   v
improve_experience  → rewrites experience bullets in strong action-verb format
   |
   v
format_cv           → structures everything into clean CV format
   |
   v
[END] → passes to PDF generator → returns downloadable file
```

---

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/resume-ai.git
cd resume-ai
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
echo "OPENAI_API_KEY=your_key_here" > .env

# Run
uvicorn main:app --reload
```

### 3. Frontend setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## Requirements

**backend/requirements.txt**
```
fastapi
uvicorn
langgraph
langchain-openai
langchain-core
pypdf2
reportlab
python-multipart
python-dotenv
pydantic
```

**Install with:**
```bash
pip install -r requirements.txt
```

---

## Deployment

### Backend → Render
1. Push `backend/` folder to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port 10000`
6. Add environment variable: `OPENAI_API_KEY` = your key
7. Deploy

### Frontend → Vercel
1. Push `frontend/` folder to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy

---

## Features Roadmap

- [x] PDF resume upload
- [x] AI resume scoring (LangGraph)
- [x] Section-by-section feedback
- [x] CV builder form
- [x] AI-enhanced CV content
- [x] CV PDF download
- [ ] Job description matching (paste JD, score resume against it)
- [ ] ATS keyword checker
- [ ] Multiple CV templates

---

## Screenshots

_Add screenshots here after building the UI_

---

## Author

**Salar Ahmed Mirza**  
[LinkedIn](https://linkedin.com/in/salar-ahmed-mirza) · [GitHub](https://github.com/YOUR_USERNAME)

---

## License

MIT