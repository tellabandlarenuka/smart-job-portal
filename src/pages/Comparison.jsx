import React, { useState } from "react";
import "../styles/Comparison.css";

function Comparison() {

  const [company1, setCompany1] = useState("");
  const [company2, setCompany2] = useState("");
  const [show, setShow] = useState(false);

  const companies = [
    "Accenture","Adobe","Amazon","Apple","Capgemini","Cisco",
    "Cognizant","Dell","Deloitte","Google","HCL","HP",
    "IBM","Infosys","Intel","L&T Infotech","Meta",
    "Microsoft","Mindtree","Oracle","Paytm",
    "Persistent","Samsung","TCS","Tech Mahindra",
    "Wipro","Zoho"
  ];

  const handleCompare = () => {
    if (company1 && company2) {
      setShow(true);
    } else {
      alert("Select two companies");
    }
  };

  return (

    <div className="page2">

      <h1 className="title2">
        Company Comparison
      </h1>


      {/* Select boxes */}

      <div className="select-container">

        <div className="select-box">

          <h2>Company 1</h2>

          <select
            value={company1}
            onChange={(e) => setCompany1(e.target.value)}
          >
            <option value="">Select Company</option>

            {companies.map((c, i) => (
              <option key={i}>{c}</option>
            ))}

          </select>

        </div>


        <div className="select-box">

          <h2>Company 2</h2>

          <select
            value={company2}
            onChange={(e) => setCompany2(e.target.value)}
          >
            <option value="">Select Company</option>

            {companies.map((c, i) => (
              <option key={i}>{c}</option>
            ))}

          </select>

        </div>

      </div>


      {/* Compare button */}

      <button className="compare-btn" onClick={handleCompare}>
        Compare
      </button>


      {/* Result */}

      {show && (

        <div className="selected-box">

          <h2 className="selected-title">
            Selected Companies
          </h2>

          <h2 className="selected-names">
            {company1} vs {company2}
          </h2>

        </div>

      )}

    </div>
  );
}

export default Comparison;