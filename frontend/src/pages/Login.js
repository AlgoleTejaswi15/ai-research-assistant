import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        null,
        {
          params: {
            username,
            password
          }
        }
      );

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
    "username",
    username
);

      

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Login failed");
      }
    }
  };


return (

<div className="login-container">

<div className="login-card">

<h1 className="login-title">
🤖 AI Research Assistant
</h1>

<input
className="login-input"
type="text"
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
className="login-input"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="login-btn"
onClick={loginUser}
>
Login
</button>

<div className="login-link">

Don't have an account?

<br/><br/>

<Link to="/register">
Create Account
</Link>

</div>

</div>

</div>

);


}

export default Login;