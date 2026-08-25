import { useState } from "react";
import "../styles/Summary.css";

function Summary() {

  const username =
    localStorage.getItem("username");

  const summary =
    localStorage.getItem(
      `summary_${username}`
    ) || "";

  console.log(
    "Stored Summary:",
    summary
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const copyText = () => {
    navigator.clipboard.writeText(summary);
    alert("Copied Successfully");
  };

  const downloadSummary = () => {

    const element =
      document.createElement("a");

    const file =
      new Blob([summary], {
        type: "text/plain"
      });

    element.href =
      URL.createObjectURL(file);

    element.download =
      "research_summary.txt";

    document.body.appendChild(element);

    element.click();
  };

  const filename =
    localStorage.getItem(
      `filename_${username}`
    );

  const uploadTime =
    localStorage.getItem(
      `uploadTime_${username}`
    );

  const wordCount =
    summary
      ? summary.split(/\s+/).length
      : 0;

  const charCount =
    summary
      ? summary.length
      : 0;

  const filteredText =
    searchTerm === ""
      ? summary
      : summary
          .split("\n")
          .filter(line =>
            line
              .toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              )
          )
          .join("\n");

  return (

    <div className="summary-container">

      <div className="summary-card">

        <h2>Research Paper Analysis</h2>

        <p style={{ color: "green" }}>
          PDF Uploaded Successfully ✓
        </p>

        <h3>
          File Name: {filename || "None"}
        </h3>

        <p>
          <b>Word Count:</b> {wordCount}
        </p>

        <p>
          <b>Character Count:</b> {charCount}
        </p>

        <p>
          <b>Upload Time:</b> {uploadTime || "None"}
        </p>

        <h2>Research Paper Content</h2>

        <input
          type="text"
          placeholder="Search in document..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <br /><br />

        <button onClick={copyText}>
          Copy Text
        </button>

        {" "}

        <button onClick={downloadSummary}>
          Download Analysis
        </button>

        <br /><br />

        <textarea
          value={filteredText}
          rows={20}
          cols={100}
          readOnly
        />

        <br /><br />

        <button
          onClick={() => {
            window.location.href = "/ask";
          }}
        >
          Ask Questions
        </button>

        {" "}

        <button
          onClick={() => {
            window.location.href =
              "/dashboard";
          }}
        >
          Back To Dashboard
        </button>

      </div>

    </div>

  );
}

export default Summary;