import React, { useState } from "react";
import "../styles/CompanyDirectory.css";

const CompanyDirectory = () => {

  const [company, setCompany] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  const companies = [
    {
      name: "Apple",
      founder: "Steve Jobs, Steve Wozniak, Ronald Wayne",
      history: "Founded in 1976, Apple started as a personal computer company and later became one of the largest technology companies in the world.",
      location: "Hyderabad",
      employees: "160,000+",
      salary: "₹10 LPA - ₹35 LPA",
      technologies: "Swift, React, Node.js, AI, Cloud",
      jobs: "Software Developer, UI Designer, Data Analyst"
    },

    {
      name: "Microsoft",
      founder: "Bill Gates, Paul Allen",
      history: "Founded in 1975, Microsoft is known for Windows OS, Office Suite, and Azure cloud platform.",
      location: "Bangalore",
      employees: "220,000+",
      salary: "₹12 LPA - ₹40 LPA",
      technologies: ".NET, React, Azure Cloud, AI",
      jobs: "Software Engineer, Cloud Engineer, Data Scientist"
    },

    {
      name: "Amazon",
      founder: "Jeff Bezos",
      history: "Founded in 1994 as an online bookstore, Amazon is now a global leader in e-commerce and cloud computing.",
      location: "Chennai",
      employees: "1,500,000+",
      salary: "₹8 LPA - ₹30 LPA",
      technologies: "Java, AWS, React, Node.js",
      jobs: "Backend Developer, DevOps Engineer, Product Manager"
    }
  ];

  const handleSearch = () => {
    setSearchCompany(company);
  };

  return (
    <div className="company-directory-page">

      <h1 className="title">Company Directory</h1>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* COMPANY CARDS */}
      <div className="card-container">

        {companies
          .filter(c =>
            c.name.toLowerCase().includes(searchCompany.toLowerCase())
          )
          .map((c, i) => (
            <div key={i} className="card">

              <h3>{c.name}</h3>

              <p><b>Founder:</b> {c.founder}</p>

              <p><b>History:</b> {c.history}</p>

              <p><b>Location:</b> {c.location}</p>

              <p><b>Total Employees:</b> {c.employees}</p>

              <p><b>Salary Details:</b> {c.salary}</p>

              <p><b>Used Technologies:</b> {c.technologies}</p>

              <p><b>Available Jobs:</b> {c.jobs}</p>

            </div>
          ))}

      </div>

    </div>
  );
};

export default CompanyDirectory;