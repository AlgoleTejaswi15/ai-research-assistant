import { useState } from "react";

function History() {

  const username =
    localStorage.getItem("username");

  const [search, setSearch] =
    useState("");

  const history =
    JSON.parse(
      localStorage.getItem(
        `history_${username}`
      )
    ) || [];

  const questionHistory =
    JSON.parse(
      localStorage.getItem(
        `questionHistory_${username}`
      )
    ) || [];

  const filteredHistory =
    history.filter((item) =>
      item.filename
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div style={{ padding: "30px" }}>

      <h1>History</h1>

      <input
        type="text"
        placeholder="Search file..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br /><br />

      <h2>📁 Upload History</h2>

      {filteredHistory.length === 0 ? (

        <p>No Upload History</p>

      ) : (

        filteredHistory.map(
          (item, index) => (

            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px"
              }}
            >

              <h3>
                {item.filename}
              </h3>

              <p>
                Uploaded: {item.uploadTime}
              </p>

            </div>

          )
        )

      )}

      <hr />

      <h2>🤖 Question History</h2>

      {questionHistory.length === 0 ? (

        <p>No Questions Asked Yet</p>

      ) : (

        questionHistory.map(
          (item, index) => (

            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px"
              }}
            >

              <h4>Question:</h4>

              <p>{item.question}</p>

              <h4>Answer:</h4>

              <p>{item.answer}</p>

              <small>{item.time}</small>

            </div>

          )
        )

      )}

      <br />

      <button
        onClick={() => {
          window.location.href =
            "/dashboard";
        }}
      >
        Back To Dashboard
      </button>

    </div>

  );

}

export default History;