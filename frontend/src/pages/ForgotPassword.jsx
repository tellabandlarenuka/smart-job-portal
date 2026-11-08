import React, { useState } from "react";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="forgot-wrapper">
      <div className="forgot-container">
        <h2>Forgot Password?</h2>
        <p>Enter your registered email address.</p>

        <form>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
