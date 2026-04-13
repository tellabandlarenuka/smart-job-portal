import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [savedNames, setSavedNames] = useState([]);
  const [savedEmails, setSavedEmails] = useState([]);

  // ✅ Load suggestions
  useEffect(() => {
    const names = JSON.parse(localStorage.getItem("names")) || [];
    const emails = JSON.parse(localStorage.getItem("emails")) || [];
    setSavedNames(names);
    setSavedEmails(emails);
  }, []);

  // 🔍 Filter suggestions
  const filteredNames = savedNames.filter((n) =>
    n.toLowerCase().includes(name.toLowerCase())
  );

  const filteredEmails = savedEmails.filter((e) =>
    e.toLowerCase().includes(email.toLowerCase())
  );

  // 🔥 Email validation (REAL-TIME)
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    let message = "";

    if (value.length === 0) {
      message = "";
    } else if (!value.includes("@")) {
      message = "Email must contain @";
    } else if (!value.split("@")[1]) {
      message = "Missing domain after @";
    } else if (!/\.[a-zA-Z]{2,}$/.test(value)) {
      message = "Email must have valid extension like .com, .in";
    }

    e.target.setCustomValidity(message);
  };

  // 🔥 Password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    let message = "";

    if (value.length < 6) {
      message = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(value)) {
      message = "Missing uppercase letter";
    } else if (!/[a-z]/.test(value)) {
      message = "Missing lowercase letter";
    } else if (!/[0-9]/.test(value)) {
      message = "Missing number";
    } else if (!/[!@#$%^&*]/.test(value)) {
      message = "Missing special character";
    }

    e.target.setCustomValidity(message);
  };

  // 🔥 Confirm password validation
  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
  "http://127.0.0.1:5000/api/users/signup",
  { name, email, password }
);

      alert(response.data || "Signup successful ✅");

      // Save suggestions
      const updatedNames = [...new Set([...savedNames, name])];
      const updatedEmails = [...new Set([...savedEmails, email])];

      localStorage.setItem("names", JSON.stringify(updatedNames));
      localStorage.setItem("emails", JSON.stringify(updatedEmails));

      setSavedNames(updatedNames);
      setSavedEmails(updatedEmails);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              required
              pattern="[A-Za-z ]+"
              title="Name should contain only letters"
              onChange={(e) => setName(e.target.value)}
            />

            {name && filteredNames.length > 0 && (
              <div className="suggestions">
                {filteredNames.map((n, i) => (
                  <div key={i} onClick={() => setName(n)}>
                    <strong>{name}</strong>
                    {n.slice(name.length)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={handleEmailChange}
            />

            {email && filteredEmails.length > 0 && (
              <div className="suggestions">
                {filteredEmails.map((e, i) => (
                  <div key={i} onClick={() => setEmail(e)}>
                    <strong>{email}</strong>
                    {e.slice(email.length)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                required
                onChange={handlePasswordChange}
              />

              <span
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={handleConfirmPassword}
            />
          </div>

          <button className="signup-btn">Sign Up</button>

          <p className="signup-text">
            Already have account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;