import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        null,
        {
          params: {
            username,
            email,
            password
          }
        }
      );

      alert(response.data.message);

      // Redirect to Login
      navigate("/");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Backend server not running");
      }

    }

  };


return (

<div className="login-container">

<div className="login-card">

<h1 className="login-title">
Create Account
</h1>

<input
className="login-input"
type="text"
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
className="login-input"
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="login-input"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="login-btn"
onClick={registerUser}
>
Register
</button>

<div className="login-link">

Already have an account?

<br/><br/>

<Link to="/">
Login Here
</Link>

</div>

</div>

</div>

);



}

export default Register;

