import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/AskQuestion.css";

function AskQuestion() {

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Logged in user
  const username = localStorage.getItem("username");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [chatHistory]);

  const askQuestion = async () => {

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);

    const currentQuestion = question;

    setQuestion("");

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/ask-question",
        {
          question: currentQuestion
        }
      );

      const newChat = {
        question: currentQuestion,
        answer: response.data.answer
      };

      setChatHistory(prev => [...prev, newChat]);

      // Save question history for current user only
      const oldQuestions =
        JSON.parse(
          localStorage.getItem(
            `questionHistory_${username}`
          )
        ) || [];

      oldQuestions.push({
        question: currentQuestion,
        answer: response.data.answer,
        time: new Date().toLocaleString()
      });

      localStorage.setItem(
        `questionHistory_${username}`,
        JSON.stringify(oldQuestions)
      );

    } catch (error) {

      console.log(error);

      alert("Failed to get answer");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="ask-container">

      <div className="ask-card">

        <h1 className="ask-title">
          AI Research Assistant
        </h1>

        <textarea
          className="ask-input"
          rows={4}
          placeholder="Ask anything about the uploaded PDF..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter" && !e.shiftKey) {

              e.preventDefault();

              askQuestion();

            }

          }}
        />

        <br /><br />

        <button
          className="ask-btn"
          onClick={askQuestion}
          disabled={loading}
        >
          {loading ? "🤖 Thinking..." : "Ask Question"}
        </button>

        <br /><br />

        {loading && (

          <h3
            style={{
              color: "#0d6efd"
            }}
          >
            🤖 AI is thinking...
          </h3>

        )}

        <div
          style={{
            marginTop: "30px"
          }}
        >

          {chatHistory.map((chat, index) => (

            <div
              key={index}
              style={{
                marginBottom: "25px"
              }}
            >

              <div
                style={{
                  background: "#DCF8C6",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "10px",
                  textAlign: "left"
                }}
              >

                <strong>👤 You</strong>

                <p>{chat.question}</p>

              </div>

              <div
                style={{
                  background: "#F5F5F5",
                  padding: "18px",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  lineHeight: "1.7"
                }}
              >

                <strong>🤖 AI Assistant</strong>

                <p>{chat.answer}</p>

              </div>

            </div>

          ))}

          <div ref={bottomRef}></div>

        </div>

        <button
          className="ask-btn"
          style={{
            background: "#dc3545",
            marginRight: "10px"
          }}
          onClick={() => setChatHistory([])}
        >
          Clear Chat
        </button>

        <button
          className="ask-btn"
          onClick={() =>
            window.location.href = "/summary"
          }
        >
          Back To Summary
        </button>

      </div>

    </div>

  );

}

export default AskQuestion;