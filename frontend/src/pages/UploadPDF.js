import axios from "axios";
import { useState } from "react";
import "../styles/Upload.css";

function UploadPDF() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const username = localStorage.getItem("username");

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload-pdf",
        formData
      );

      // Save summary
      localStorage.setItem(
        `summary_${username}`,
        response.data.summary
      );

      // Save upload history
      const oldHistory =
        JSON.parse(
          localStorage.getItem(
            `history_${username}`
          )
        ) || [];

      const currentTime =
        new Date().toLocaleString();

      oldHistory.push({
        filename: file.name,
        uploadTime: currentTime
      });

      localStorage.setItem(
        `history_${username}`,
        JSON.stringify(oldHistory)
      );

      // Save last uploaded file
      localStorage.setItem(
        `filename_${username}`,
        file.name
      );

      localStorage.setItem(
        `uploadTime_${username}`,
        currentTime
      );

      setLoading(false);

      window.location.href = "/summary";

    } catch (error) {

      setLoading(false);

      alert("Upload failed");

      console.log(error);

    }

  };

  return (

    <div className="upload-container">

      <div className="upload-box">

        <h1>
          Upload Research Paper PDF
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <p>
          Selected File:{" "}
          {file
            ? file.name
            : "No file selected"}
        </p>

        <p>
          Supported Format: PDF Only
        </p>

        <p>
          Maximum Size: 10 MB
        </p>

        <br /><br />

        <button
          onClick={uploadFile}
          disabled={loading}
        >

          {loading
            ? "Generating Summary..."
            : "Upload PDF"}

        </button>

      </div>

    </div>

  );
}

export default UploadPDF;