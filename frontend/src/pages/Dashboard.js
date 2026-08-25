import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const username =
    localStorage.getItem("username");

  const clearHistory = () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to clear all upload history?"
      );

    if (confirmDelete) {

      localStorage.removeItem(
        `history_${username}`
      );

      localStorage.removeItem(
        `summary_${username}`
      );

      localStorage.removeItem(
        `filename_${username}`
      );

      localStorage.removeItem(
        `uploadTime_${username}`
      );

      localStorage.removeItem(
        `questionHistory_${username}`
      );

      alert("History Cleared");

      window.location.reload();
    }
  };

  const history =
    JSON.parse(
      localStorage.getItem(
        `history_${username}`
      )
    ) || [];

  const totalUploads =
    history.length;

  const questionHistory =
    JSON.parse(
      localStorage.getItem(
        `questionHistory_${username}`
      )
    ) || [];

  const totalQuestions =
    questionHistory.length;

  const totalSummaries =
    totalUploads;

  const filename =
    localStorage.getItem(
      `filename_${username}`
    );

  const uploadTime =
    localStorage.getItem(
      `uploadTime_${username}`
    );

  return (

    <div className="dashboard">

      <div className="dashboard-card">

        <h1>
          🤖 AI Research Assistant
        </h1>

        <p>
          Upload, Analyze and Manage
          Research Papers using AI
        </p>

        <hr />

        <h2>
          Welcome {username || "Researcher"} 👋
        </h2>

        <p>
          Manage your uploaded research papers,
          summaries and analysis reports.
        </p>

        <h2>
          Dashboard Analytics
        </h2>

        <div className="stats">

          <div className="card">
            <h2>{totalUploads}</h2>
            <p>Total Uploads</p>
          </div>

          <div className="card">
            <h2>{totalQuestions}</h2>
            <p>Total Questions</p>
          </div>

          <div className="card">
            <h2>{totalSummaries}</h2>
            <p>Total Summaries</p>
          </div>

          <div className="card">
            <h2>
              {filename ? "✓" : "✗"}
            </h2>
            <p>Status</p>
          </div>

          <div className="card">
            <h2>
              {uploadTime ? "✓" : "✗"}
            </h2>
            <p>Last Upload</p>
          </div>

        </div>

        <p>
          <b>Last Uploaded:</b>{" "}
          {filename || "None"}
        </p>

        <p>
          <b>Status:</b>{" "}
          {filename
            ? "Uploaded Successfully"
            : "No Uploads Yet"}
        </p>

        <p>
          <b>Last Upload Time:</b>{" "}
          {uploadTime || "None"}
        </p>

        <hr />

        <p>
          Upload research papers and analyze them using AI.
        </p>

        <br />

        <Link to="/upload">
          <button>
            Upload PDF
          </button>
        </Link>

        <br /><br />

        <Link to="/history">
          <button>
            Upload History
          </button>
        </Link>

        <br /><br />

        <button
          onClick={() => {
            window.location.href = "/summary";
          }}
        >
          View Last Analysis
        </button>

        <br /><br />

        <button
          onClick={clearHistory}
        >
          Clear History
        </button>

        <br /><br />

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        <hr />

        <p>
          Powered by RAG • Groq • LangChain • React
        </p>

      </div>

    </div>

  );
}

export default Dashboard;