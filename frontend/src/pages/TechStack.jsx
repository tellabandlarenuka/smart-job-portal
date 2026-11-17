import React, { useState } from "react";
import "../styles/TechStack.css";

const techList = [
  "react",
  "angular",
  "vue",
  "java",
  "python",
  "javascript",
  "node",
  "spring",
  "mysql",
  "mongodb",
  "cloud",
  "aws",
  "devops",
  "docker",
  "kubernetes",
  "ai",
];

const TechStack = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  const fetchTech = async (technology) => {
    if (!technology.trim()) {
      setResult(null);
      return;
    }

    try {
      const url = `http://localhost:5000/api/users/tech-stack?technology=${encodeURIComponent(technology)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch technology details");
      }

      const data = await response.json();

      if (data.length > 0) {
        const tech = data[0];

        setResult({
          category: tech.category,
          popularity: tech.popularity,
          companies: tech.companies
            ? [...new Set(tech.companies.split(","))]
            : [],
        });
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error("Error fetching tech stack:", error);
      setResult(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTech(search);
  };

  const showTech = (name) => {
    setSearch(name);
    fetchTech(name);
  };

  const handleInputChange = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setResult(null);
    }
  };

  return (
    <div className="tech-page">
      <h1 className="tech-title">Tech Stack Popularity</h1>

      <form className="search-area" onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter technology"
        />

        <button type="submit">Search</button>
      </form>

      <div className="tech-list">
        {techList.map((t) => (
          <button key={t} className="tech-btn" onClick={() => showTech(t)}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {result && (
        <div className="result-box">
          <h2>Category : {result.category}</h2>

          <h2>Popularity</h2>

          <div className="bar">
            <div className="fill" style={{ width: `${result.popularity}%` }} />
            <span className="percentage">{result.popularity}%</span>
          </div>

          <h2>Companies Using</h2>

          <div className="company-box">
            {result.companies.map((c, i) => (
              <div key={i} className="company-item">
                {c}
              </div>
            ))}
          </div>
        </div>
      )}

      {!result && search.trim() !== "" && <h2>No technology found</h2>}
    </div>
  );
};

export default TechStack;
