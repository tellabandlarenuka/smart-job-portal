import React, { useState } from "react";
import "../styles/CompanyDirectory.css";

const CompanyDirectory = () => {
  const [company, setCompany] = useState("");
  const [dbCompanies, setDbCompanies] = useState(null);
  const [message, setMessage] = useState("");

  const companies = [
    {
      name: "Apple",
      founder: "Steve Jobs, Steve Wozniak, Ronald Wayne",
      history:
        "Founded in 1976, Apple started as a personal computer company and later became one of the largest technology companies in the world.",
      location: "Hyderabad",
      employees: "160,000+",
      salary: "₹10 LPA - ₹35 LPA",
      technologies: "Swift, React, Node.js, AI, Cloud",
      jobs: "Software Developer, UI Designer, Data Analyst",
    },

    {
      name: "Microsoft",
      founder: "Bill Gates, Paul Allen",
      history:
        "Founded in 1975, Microsoft is known for Windows OS, Office Suite, and Azure cloud platform.",
      location: "Bangalore",
      employees: "220,000+",
      salary: "₹12 LPA - ₹40 LPA",
      technologies: ".NET, React, Azure Cloud, AI",
      jobs: "Software Engineer, Cloud Engineer, Data Scientist",
    },

    {
      name: "Amazon",
      founder: "Jeff Bezos",
      history:
        "Founded in 1994 as an online bookstore, Amazon is now a global leader in e-commerce and cloud computing.",
      location: "Chennai",
      employees: "1,500,000+",
      salary: "₹8 LPA - ₹30 LPA",
      technologies: "Java, AWS, React, Node.js",
      jobs: "Backend Developer, DevOps Engineer, Product Manager",
    },
  ];

  const handleSearch = async () => {
    if (!company.trim()) {
      setDbCompanies(null);
      setMessage("");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/company_directory?name=${encodeURIComponent(company)}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch companies");
      }

      const data = await res.json();

      setDbCompanies(data);

      setMessage(data.length === 0 ? "Company details Not found" : "");
    } catch (error) {
      console.log("Company Search Error:", error);
      setDbCompanies([]);
      setMessage("Unable to fetch company details.");
    }
  };

  const displayCompanies = dbCompanies === null ? companies : dbCompanies;

  return (
    <div className="company-directory-page">
      <h1 className="title">Company Directory</h1>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            if (!e.target.value.trim()) {
              setDbCompanies(null);
              setMessage("");
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* COMPANY CARDS */}
      <div className="card-container">
        {displayCompanies.map((c, i) => (
          <div key={c.id || i} className="card">
            <h3>{c.name}</h3>

            <p>
              <b>Founder:</b> {c.founder}
            </p>

            <p>
              <b>History:</b> {c.history}
            </p>

            <p>
              <b>Location:</b> {c.location}
            </p>

            <p>
              <b>Total Employees:</b> {c.employees}
            </p>

            <p>
              <b>Salary Details:</b> {c.salary}
            </p>

            <p>
              <b>Used Technologies:</b> {c.technologies}
            </p>

            {c.jobs && (
              <p>
                <b>Available Jobs:</b> {c.jobs}
              </p>
            )}
          </div>
        ))}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CompanyDirectory;
