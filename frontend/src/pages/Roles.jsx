import React, { useState, useEffect, useRef } from "react";
import "../styles/Roles.css";

function Roles() {
  const [roleInput, setRoleInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [jobs, setJobs] = useState([]);

  const requestId = useRef(0);

  const roles = [
    "Software Engineer",
    "Python Developer",
    "Java Developer",
    "Web Developer",
    "Data Scientist",
    "AI Engineer",
    "Cloud Engineer",
    "DevOps Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Cyber Security",
    "Testing Engineer",
    "Mobile App Developer",
    "Network Engineer",
    "Database Developer",
  ];

  // Fetch jobs from MySQL
  const fetchJobs = async (role = "") => {
    const currentRequest = ++requestId.current;

    try {
      const url = role.trim()
        ? `http://localhost:5000/api/users/job-roles?role=${encodeURIComponent(role)}`
        : "http://localhost:5000/api/users/job-roles";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch job roles");
      }

      const data = await response.json();

      // Ignore outdated requests
      if (currentRequest === requestId.current) {
        setJobs(data);
      }
    } catch (error) {
      if (currentRequest === requestId.current) {
        console.error("Error fetching job roles:", error);
        setJobs([]);
      }
    }
  };

  // Search function
  const searchRole = (role) => {
    const r = role.trim();

    if (!r) {
      requestId.current++;
      setSelectedRole("");
      setJobs([]);
      return;
    }

    setSelectedRole(r);
    setJobs([]);
    fetchJobs(r);
  };
  // Handle input and Backspace
  const handleInputChange = (value) => {
    setRoleInput(value);

    if (value.trim() === "") {
      requestId.current++;
      setSelectedRole("");
      setJobs([]);
    }
  };

  // Search button and Enter key
  const handleSubmit = (e) => {
    e.preventDefault();
    searchRole(roleInput);
  };

  return (
    <div className="roles-page">
      <h1 className="roles-title">Search Job Role</h1>

      {/* Search box */}
      <form className="search-area" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter role"
          value={roleInput}
          onChange={(e) => handleInputChange(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {/* Role buttons */}
      <div className="roles-list">
        {roles.map((r, i) => (
          <button
            key={i}
            className="role-btn"
            onClick={() => {
              setRoleInput(r);
              searchRole(r);
            }}>
            {r}
          </button>
        ))}
      </div>

      {/* Result table */}
      {jobs.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Rating</th>
              <th>Type</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((j, i) => (
              <tr key={i}>
                <td>{j.company}</td>
                <td>{j.role}</td>
                <td>{j.salary}</td>
                <td>{"⭐".repeat(Number(j.rating) || 0)}</td>
                <td>{j.type}</td>
                <td>{j.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedRole && jobs.length === 0 && <h2>No companies found</h2>}
    </div>
  );
}

export default Roles;
