import { useState } from "react";
import {
  ArrowUp,
  FileText,
  Globe,
  Calculator,
  Sparkles,
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://YOUR-RENDER-BACKEND.onrender.com";

function App() {
  const [goal, setGoal] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const runAgent = async () => {
    if (!goal.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(`${API_URL}/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: goal.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Request failed");
      }

      setAnswer(data.result || "No response received.");
    } catch (error) {
      setAnswer(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      setUploadStatus(
        data.result || "Document uploaded successfully."
      );
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      runAgent();
    }
  };

  return (
    <div className="app-shell">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={18} />
          </div>

          <span>Research Agent</span>
        </div>

        <div className="status-pill">
          <span className="status-dot" />
          AI Online
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="eyebrow">
            <Sparkles size={15} />
            Intelligent Research Workspace
          </div>

          <h1>
            Research.
            <br />
            <span>Think. Execute.</span>
          </h1>

          <p>
            An AI agent that can research the web,
            calculate answers, and understand your
            documents.
          </p>
        </section>

        <section className="workspace">
          <div className="input-card">
            <textarea
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you want me to research or solve?"
              rows={4}
            />

            <div className="input-footer">
              <div className="tool-hints">
                <span>
                  <Globe size={14} />
                  Web
                </span>

                <span>
                  <Calculator size={14} />
                  Calculate
                </span>

                <span>
                  <FileText size={14} />
                  Documents
                </span>
              </div>

              <button
                className="send-button"
                onClick={runAgent}
                disabled={loading || !goal.trim()}
              >
                {loading ? (
                  <Loader2
                    size={18}
                    className="spin"
                  />
                ) : (
                  <ArrowUp size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="document-card">
            <div className="document-header">
              <div>
                <h2>Knowledge Base</h2>
                <p>
                  Upload a PDF and ask the agent
                  questions about it.
                </p>
              </div>

              <div className="upload-icon">
                <Upload size={18} />
              </div>
            </div>

            <label className="drop-zone">
              <FileText size={28} />

              <strong>
                {file
                  ? file.name
                  : "Choose a PDF document"}
              </strong>

              <span>
                {file
                  ? "Ready to upload"
                  : "PDF files only"}
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  setUploadStatus("");
                }}
              />
            </label>

            {file && (
              <button
                className="upload-button"
                onClick={uploadDocument}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2
                      size={16}
                      className="spin"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload Document
                  </>
                )}
              </button>
            )}

            {uploadStatus && (
              <div className="upload-status">
                <CheckCircle2 size={16} />
                <span>{uploadStatus}</span>
              </div>
            )}
          </div>

          {answer && (
            <div className="answer-card">
              <div className="answer-header">
                <div className="answer-title">
                  <div className="agent-avatar">
                    <Sparkles size={16} />
                  </div>

                  <div>
                    <strong>AI Research Agent</strong>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              <div className="answer-content">
                {answer}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer>
        Powered by Groq · Tavily · RAG
      </footer>
    </div>
  );
}

export default App;
