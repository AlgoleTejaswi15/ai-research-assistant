import axios from "axios";
import { useState } from "react";

function Chat() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askQuestion = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/ask?query=${question}`
            );

            setAnswer(response.data.answer);

        } catch (error) {

            alert("Error asking question");

            console.log(error);
        }
    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>AI Research Chat</h1>

            <input
                type="text"
                placeholder="Ask question about paper"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <br /><br />

            <button onClick={askQuestion}>
                Ask AI
            </button>

            <br /><br />

            <h2>Answer</h2>

            <p>{answer}</p>

        </div>
    );
}

export default Chat;