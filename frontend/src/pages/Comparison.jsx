import React, { useState } from "react";
import "../styles/Comparison.css";

function Comparison() {
  const [company1, setCompany1] = useState("");
  const [company2, setCompany2] = useState("");
  const [companyDetails, setCompanyDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const companies = [
    "Accenture",
    "Adobe",
    "Amazon",
    "Apple",
    "Capgemini",
    "Cisco",
    "Cognizant",
    "Dell",
    "Deloitte",
    "Google",
    "HCL Technologies",
    "HP",
    "IBM",
    "Infosys",
    "Intel",
    "LTIMindtree",
    "Meta",
    "Microsoft",
    "Oracle",
    "Paytm",
    "Persistent Systems",
    "Samsung",
    "TCS",
    "Tech Mahindra",
    "Wipro",
    "Zoho",
  ];

  const handleCompare = async () => {
    if (!company1 || !company2) {
      alert("Select two companies");
      return;
    }

    if (company1 === company2) {
      alert("Select two different companies");
      return;
    }

    setLoading(true);
    setShow(false);

    try {
      const [res1, res2] = await Promise.all([
        fetch(
          `http://localhost:5000/api/users/companies?name=${encodeURIComponent(company1)}`,
        ),
        fetch(
          `http://localhost:5000/api/users/companies?name=${encodeURIComponent(company2)}`,
        ),
      ]);

      if (!res1.ok || !res2.ok) {
        throw new Error("Unable to fetch company details");
      }

      const data1 = await res1.json();
      const data2 = await res2.json();

      if (data1.length === 0 || data2.length === 0) {
        alert("Company details not found in database");
        return;
      }

      setCompanyDetails([data1[0], data2[0]]);
      setShow(true);
    } catch (error) {
      console.error("Comparison error:", error);
      alert("Unable to fetch company details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page2">
      <h1 className="title2">Company Comparison</h1>

      <div className="select-container">
        <div className="select-box">
          <h2>Company 1</h2>

          <select
            value={company1}
            onChange={(e) => {
              setCompany1(e.target.value);
              setShow(false);
            }}>
            <option value="">Select Company</option>

            {companies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="select-box">
          <h2>Company 2</h2>

          <select
            value={company2}
            onChange={(e) => {
              setCompany2(e.target.value);
              setShow(false);
            }}>
            <option value="">Select Company</option>

            {companies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="compare-btn"
        onClick={handleCompare}
        disabled={loading}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      {show && (
        <div className="comparison-result">
          <h2 className="selected-title">Company Comparison</h2>

          <div className="comparison-cards">
            {companyDetails.map((company) => (
              <div className="comparison-card" key={company.id}>
                <h2>{company.name}</h2>

                <p>
                  <strong>Founder:</strong> {company.founder || "Not available"}
                </p>

                <p>
                  <strong>History:</strong> {company.history || "Not available"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {company.location || "Not available"}
                </p>

                <p>
                  <strong>Employees:</strong>{" "}
                  {company.employees ?? "Not available"}
                </p>

                <p>
                  <strong>Average Salary:</strong>{" "}
                  {company.salary ?? "Not available"}
                </p>

                <p>
                  <strong>Technologies:</strong>{" "}
                  {company.technologies || "Not available"}
                </p>

                <p>
                  <strong>Job Opportunities:</strong>{" "}
                  {company.jobs || "Not available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comparison;
