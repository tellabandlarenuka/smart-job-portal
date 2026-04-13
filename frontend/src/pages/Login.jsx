import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [userInput, setUserInput] = useState(""); // changed
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userInput,   // using input as email
        password: password
      })
    });

    const data = await res.text();
    alert(data);

  } catch (err) {
    console.log(err);
    alert("Error connecting to server ❌");
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email / Username</label> {/* changed */}
            <input
              type="text"   /* changed */
              placeholder="Enter Email or Username"  /* changed */
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-text">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;