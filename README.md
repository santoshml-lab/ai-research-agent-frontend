# 🤖 AI Research Agent

An intelligent **Agentic AI Research Assistant** that can understand user goals, select the appropriate tool, perform multi-step tasks, research the web, calculate mathematical expressions, and answer questions from uploaded PDF documents.

The project combines **LLM-based reasoning, tool calling, web search, and RAG-based document retrieval** into one full-stack AI application.

---

## 🚀 Live Demo

🌐 **Frontend:**  
https://ai-research-agent-frontend-sigma.vercel.app/

⚡ **Backend API:**  
https://ai-research-agent-3xmg.onrender.com/

📚 **API Documentation:**  
https://ai-research-agent-3xmg.onrender.com/docs

---

## ✨ Features

### 🧠 Agentic AI

The agent receives a user's goal and decides which available tool is required to complete the task.

It can:

- Understand user goals
- Select tools automatically
- Execute multiple tool calls
- Combine tool results
- Generate a final answer
- Maintain short-term conversation memory

---

### 🌐 Web Research

Powered by **Tavily Search**.

The agent can search the web for:

- Latest information
- Current events
- Technology trends
- Research topics
- Factual information

When web search is used, the agent includes the returned sources in its response.

---

### 🧮 Calculator Tool

The agent can automatically use the calculator for mathematical operations.

Example:

```text
Calculate 125 * 48 + 350
The agent identifies that a calculation is required and executes the calculator tool.
📄 PDF Knowledge Base
Users can upload PDF documents through the frontend.
The backend:
Receives the PDF
Extracts its text
Splits the document into chunks
Creates TF-IDF vectors
Stores the document representation
Searches relevant chunks when the user asks a question
Example:
Upload a loan approval report.

Question:
According to the uploaded document, what is the main topic?
The agent retrieves relevant document content and generates an answer based on it.
🔎 RAG-Based Document Retrieval
The project implements a lightweight Retrieval-Augmented Generation pipeline using:
TF-IDF Vectorization
Cosine Similarity
PDF text extraction
Relevant chunk retrieval
Groq LLM generation
The agent is instructed not to claim that information came from a document unless it was actually retrieved from the loaded document.
📊 Agent Activity
The frontend displays the agent's execution process:
Understanding your goal...
        ↓
Selecting the right tool...
        ↓
Agent is working...
        ↓
Answer generated successfully
This gives users visibility into the agent workflow.
🏗️ System Architecture
                         USER
                           │
                           ▼
                ┌────────────────────┐
                │   React Frontend   │
                │       Vercel       │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │    FastAPI API     │
                │       Render       │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     Groq LLM       │
                │  AI Research Agent │
                └─────────┬──────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
       ┌──────────┐ ┌──────────┐ ┌──────────────┐
       │  Tavily  │ │Calculator│ │ PDF / RAG    │
       │  Search  │ │   Tool   │ │  Retrieval   │
       └──────────┘ └──────────┘ └──────────────┘
             │            │            │
             └────────────┼────────────┘
                          ▼
                ┌────────────────────┐
                │   Final AI Answer  │
                └────────────────────┘
🛠️ Tech Stack
Frontend
React
Vite
Lucide React
CSS
Vercel
Backend
Python
FastAPI
Uvicorn
Render
AI
Groq API
openai/gpt-oss-20b
Function/Tool Calling
Search
Tavily API
Document Processing
pypdf
Scikit-learn
TF-IDF
Cosine Similarity
📁 Project Structure
AI-Research-Agent/
│
├── backend/
│   │
│   ├── main.py
│   ├── agent.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
⚙️ Environment Variables
Create a .env file inside the backend directory.
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
Frontend Environment Variable
Create:
.env
inside the frontend directory.
VITE_API_URL=https://ai-research-agent-3xmg.onrender.com
Never expose private API keys in frontend code or commit .env files to GitHub.
📦 Backend Installation
Clone the repository:
git clone YOUR_GITHUB_REPOSITORY_URL
Move into the backend directory:
cd backend
Create a virtual environment:
python -m venv venv
Activate it.
Windows
venv\Scripts\activate
Linux / macOS
source venv/bin/activate
Install dependencies:
pip install -r requirements.txt
Run the backend:
uvicorn main:app --reload
Backend will be available at:
http://127.0.0.1:8000
🎨 Frontend Installation
Move into the frontend directory:
cd frontend
Install dependencies:
npm install
Start development server:
npm run dev
🔌 API Endpoints
GET /
Checks whether the API is running.
Example response:
{
  "message": "AI Research Agent API is running 🚀"
}
POST /agent
Runs the AI research agent.
Request:
{
  "goal": "Research the latest developments in AI in 2026."
}
Response:
{
  "goal": "Research the latest developments in AI in 2026.",
  "result": "..."
}
POST /upload
Uploads a PDF document and loads it into the document retrieval system.
Request:
multipart/form-data
file: document.pdf
Response:
{
  "filename": "document.pdf",
  "result": "Document loaded successfully."
}
🔄 Agent Workflow
The application follows an agentic workflow:
User Goal
   │
   ▼
Groq LLM
   │
   ▼
Understand Goal
   │
   ▼
Select Tool
   │
   ├── Web Research ───────► Tavily
   │
   ├── Calculation ────────► Calculator
   │
   └── Document Question ──► RAG Search
                                  │
                                  ▼
                            Relevant Chunks
                                  │
                                  ▼
                              Groq LLM
                                  │
                                  ▼
                            Final Answer
🧪 Example Queries
Web Research
Research the latest AI developments in 2026.
Calculator
Calculate 125 * 48 + 350.
PDF Question
According to the uploaded document, what is the main topic?
Combined Task
Research the latest AI trends and compare them with the information in my uploaded document.
🔐 Security Considerations
The project uses environment variables for API credentials.
Do not commit:
.env
to GitHub.
Recommended .gitignore:
.env
venv/
__pycache__/
node_modules/
dist/
☁️ Deployment
Backend
The FastAPI backend is deployed on Render.
Production API:
https://ai-research-agent-3xmg.onrender.com
Frontend
The React frontend is deployed on Vercel.
Production application:
https://ai-research-agent-frontend-sigma.vercel.app/
🎯 What This Project Demonstrates
This project demonstrates practical implementation of:
Agentic AI
LLM Tool Calling
Autonomous Tool Selection
Retrieval-Augmented Generation
PDF Document Understanding
Web Search Integration
Mathematical Tool Execution
Multi-Step AI Workflows
FastAPI API Development
React Frontend Development
Cloud Deployment
AI Application Architecture
🚀 Future Improvements
Possible next-generation improvements include:
Persistent vector database
Embedding-based semantic search
Streaming AI responses
Multi-agent architecture
Long-term conversation memory
Authentication
Multiple document support
Document citations
Agent execution logs
Better document chunking
Production monitoring
Rate limiting
👨‍💻 Project
AI Research Agent
Built as a practical Agentic AI application combining LLM reasoning, external tools, web research, and document retrieval.
⭐ Support
If you find this project useful, consider giving the repository a ⭐ on GitHub.
