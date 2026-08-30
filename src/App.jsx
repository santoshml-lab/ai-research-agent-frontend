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
  Brain,
} from "lucide-react";


/* =========================================================
   API
========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-research-agent-3xmg.onrender.com";


/* =========================================================
   APP
========================================================= */

function App() {

  const [goal, setGoal] = useState("");

  const [answer, setAnswer] = useState("");

  const [file, setFile] = useState(null);

  const [uploadStatus, setUploadStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [activity, setActivity] =
    useState([]);


  /* =======================================================
     RUN AGENT
  ======================================================= */

  const runAgent = async () => {

    if (!goal.trim()) return;

    setLoading(true);

    setAnswer("");

    setActivity([
      {
        icon: "brain",
        text: "Understanding your goal...",
        status: "working",
      },
    ]);


    try {

      const response = await fetch(
        `${API_URL}/agent`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            goal: goal.trim(),
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Request failed"
        );

      }


      /* =========================================
         REAL BACKEND ACTIVITY
      ========================================= */

      const realActivity =
        data.activity || [];


      const formattedActivity =
        realActivity.map(
          (item) => {

            return {
              icon:
                item.icon ||
                "sparkle",

              text:
                `${item.label || item.tool} completed`,

              status:
                item.status ||
                "completed",
            };

          }
        );


      setActivity([
        {
          icon: "brain",
          text: "Goal understood",
          status: "completed",
        },

        ...formattedActivity,

        {
          icon: "check",
          text:
            "Answer generated successfully",
          status: "completed",
        },
      ]);


      setAnswer(
        data.result ||
        "No response received."
      );

    }


    catch (error) {

      setActivity([
        {
          icon: "brain",
          text:
            "Agent encountered an error",
          status: "error",
        },
      ]);


      setAnswer(
        `Error: ${error.message}`
      );

    }


    finally {

      setLoading(false);

    }

  };


  /* =======================================================
     UPLOAD DOCUMENT
  ======================================================= */

  const uploadDocument = async () => {

    if (!file) return;

    setUploading(true);

    setUploadStatus("");


    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );


      const response =
        await fetch(
          `${API_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Upload failed"
        );

      }


      setUploadStatus(
        data.result ||
        "Document uploaded successfully."
      );

    }


    catch (error) {

      setUploadStatus(
        `Error: ${error.message}`
      );

    }


    finally {

      setUploading(false);

    }

  };


  /* =======================================================
     ENTER KEY
  ======================================================= */

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      runAgent();

    }

  };


  /* =======================================================
     ACTIVITY ICON
  ======================================================= */

  const ActivityIcon = ({
    type,
  }) => {

    if (type === "brain") {

      return (
        <Brain size={15} />
      );

    }


    if (
      type === "search" ||
      type === "globe"
    ) {

      return (
        <Globe size={15} />
      );

    }


    if (
      type === "calculator"
    ) {

      return (
        <Calculator size={15} />
      );

    }


    if (
      type === "file" ||
      type === "document"
    ) {

      return (
        <FileText size={15} />
      );

    }


    if (type === "check") {

      return (
        <CheckCircle2
          size={15}
        />
      );

    }


    return (
      <Sparkles size={15} />
    );

  };


  /* =======================================================
     UI
  ======================================================= */

  return (

    <div className="app-shell">

      {/* Background */}

      <div
        className="background-glow glow-one"
      />

      <div
        className="background-glow glow-two"
      />


      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">

            <Sparkles size={18} />

          </div>

          <span>
            Research Agent
          </span>

        </div>


        <div className="status-pill">

          <span className="status-dot" />

          AI Online

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main-content">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <div className="eyebrow">

            <Sparkles size={15} />

            Intelligent Research Workspace

          </div>


          <h1>

            Research.

            <br />

            <span>
              Think. Execute.
            </span>

          </h1>


          <p>

            An AI agent that can
            research the web,
            calculate answers,
            and understand your
            documents.

          </p>

        </section>


        {/* =================================================
            WORKSPACE
        ================================================= */}

        <section className="workspace">


          {/* =================================================
              AGENT INPUT
          ================================================= */}

          <div className="input-card">

            <textarea

              value={goal}

              onChange={(event) =>
                setGoal(
                  event.target.value
                )
              }

              onKeyDown={
                handleKeyDown
              }

              placeholder="What do you want me to research or solve?"

              rows={4}

            />


            <div className="input-footer">


              {/* TOOL HINTS */}

              <div className="tool-hints">

                <span>

                  <Globe size={14} />

                  Web

                </span>


                <span>

                  <Calculator
                    size={14}
                  />

                  Calculate

                </span>


                <span>

                  <FileText
                    size={14}
                  />

                  Documents

                </span>

              </div>


              {/* SEND */}

              <button

                className="send-button"

                onClick={
                  runAgent
                }

                disabled={
                  loading ||
                  !goal.trim()
                }

              >

                {loading ? (

                  <Loader2
                    size={18}
                    className="spin"
                  />

                ) : (

                  <ArrowUp
                    size={18}
                  />

                )}

              </button>

            </div>

          </div>


          {/* =================================================
              REAL AGENT ACTIVITY
          ================================================= */}

          {activity.length > 0 && (

            <div className="activity-card">


              {/* HEADER */}

              <div className="activity-header">

                <div className="activity-title">


                  <div className="activity-avatar">

                    <Brain size={16} />

                  </div>


                  <div>

                    <strong>
                      Agent Activity
                    </strong>


                    <span>

                      {loading
                        ? "Working..."
                        : "Task completed"}

                    </span>

                  </div>

                </div>


                {loading && (

                  <Loader2
                    size={17}
                    className="spin activity-loader"
                  />

                )}

              </div>


              {/* ACTIVITY LIST */}

              <div className="activity-list">

                {activity.map(
                  (item, index) => (

                    <div
                      className="activity-item"
                      key={index}
                    >


                      {/* ICON */}

                      <div
                        className={
                          item.status ===
                          "error"
                            ? "activity-check activity-error"
                            : "activity-check"
                        }
                      >

                        <ActivityIcon
                          type={
                            item.icon
                          }
                        />

                      </div>


                      {/* TEXT */}

                      <span>

                        {item.text}

                      </span>


                      {/* STATUS */}

                      {item.status ===
                        "completed" && (

                        <CheckCircle2
                          size={15}
                          className="activity-success"
                        />

                      )}

                    </div>

                  )
                )}

              </div>

            </div>

          )}


          {/* =================================================
              KNOWLEDGE BASE
          ================================================= */}

          <div className="document-card">


            {/* HEADER */}

            <div className="document-header">

              <div>

                <h2>
                  Knowledge Base
                </h2>


                <p>

                  Upload a PDF and ask
                  the agent questions
                  about it.

                </p>

              </div>


              <div className="upload-icon">

                <Upload size={18} />

              </div>

            </div>


            {/* DROP ZONE */}

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

                  const selectedFile =
                    event.target.files?.[0];

                  setFile(
                    selectedFile ||
                    null
                  );

                  setUploadStatus("");

                }}

              />

            </label>


            {/* UPLOAD BUTTON */}

            {file && (

              <button

                className="upload-button"

                onClick={
                  uploadDocument
                }

                disabled={
                  uploading
                }

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

                    <Upload
                      size={16}
                    />

                    Upload Document

                  </>

                )}

              </button>

            )}


            {/* UPLOAD STATUS */}

            {uploadStatus && (

              <div
                className={
                  uploadStatus
                    .startsWith(
                      "Error:"
                    )
                    ? "upload-status upload-error"
                    : "upload-status"
                }
              >

                {!uploadStatus.startsWith(
                  "Error:"
                ) && (

                  <CheckCircle2
                    size={16}
                  />

                )}

                <span>

                  {uploadStatus}

                </span>

              </div>

            )}

          </div>


          {/* =================================================
              ANSWER
          ================================================= */}

          {answer && (

            <div className="answer-card">


              {/* HEADER */}

              <div className="answer-header">

                <div className="answer-title">


                  <div className="agent-avatar">

                    <Sparkles
                      size={16}
                    />

                  </div>


                  <div>

                    <strong>
                      AI Research Agent
                    </strong>

                    <span>
                      Completed
                    </span>

                  </div>

                </div>

              </div>


              {/* ANSWER */}

              <div className="answer-content">

                {answer}

              </div>

            </div>

          )}

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>

        Powered by Groq · Tavily · RAG

      </footer>

    </div>

  );

}


export default App;,
                
