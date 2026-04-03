import React, { useState } from "react";
import "../styles/TechStack.css";

const techData = {

  react: {
    category: "Framework",
    popularity: 90,
    companies: ["Google", "Facebook", "Netflix", "Amazon"]
  },

  angular: {
    category: "Framework",
    popularity: 75,
    companies: ["Infosys", "Capgemini", "Cognizant"]
  },

  vue: {
    category: "Framework",
    popularity: 70,
    companies: ["Alibaba", "GitLab"]
  },

  java: {
    category: "Language",
    popularity: 85,
    companies: ["TCS", "Infosys", "Wipro"]
  },

  python: {
    category: "Language",
    popularity: 88,
    companies: ["Google", "Microsoft", "IBM"]
  },

  javascript: {
    category: "Scripting",
    popularity: 92,
    companies: ["Google", "Meta", "Amazon"]
  },

  node: {
    category: "Runtime",
    popularity: 82,
    companies: ["Paytm", "Flipkart"]
  },

  spring: {
    category: "Framework",
    popularity: 76,
    companies: ["TCS", "Infosys"]
  },

  mysql: {
    category: "Database",
    popularity: 80,
    companies: ["Oracle", "IBM"]
  },

  mongodb: {
    category: "Database",
    popularity: 79,
    companies: ["Uber", "Netflix"]
  },

  cloud: {
    category: "Cloud",
    popularity: 92,
    companies: ["AWS", "Google", "Microsoft"]
  },

  aws: {
    category: "Cloud",
    popularity: 91,
    companies: ["Amazon", "Netflix"]
  },

  devops: {
    category: "Tool",
    popularity: 84,
    companies: ["Amazon", "Infosys"]
  },

  docker: {
    category: "Tool",
    popularity: 77,
    companies: ["Google", "Amazon"]
  },

  kubernetes: {
    category: "Tool",
    popularity: 83,
    companies: ["Google", "Microsoft"]
  },

  ai: {
    category: "Technology",
    popularity: 95,
    companies: ["OpenAI", "Google"]
  }

};

const techList = Object.keys(techData);

const TechStack = () => {

  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  const showTech = (name) => {
    setResult(techData[name]);
    setSearch(name);
  };

  const handleSearch = () => {

    const key = search.toLowerCase();

    if (techData[key]) {

      setResult(techData[key]);

    } else {

      setResult({
        category: "Unknown",
        popularity: 60,
        companies: ["Data not available"]
      });

    }
  };

  return (

    <div className="tech-page">

      <h1 className="tech-title">
        Tech Stack Popularity
      </h1>


      {/* search */}

      <div className="search-area">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter technology"
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>


      {/* buttons */}

      <div className="tech-list">

        {techList.map((t) => (

          <button
            key={t}
            className="tech-btn"
            onClick={() => showTech(t)}
          >
            {t.toUpperCase()}
          </button>

        ))}

      </div>


      {/* result */}

      {result && (

        <div className="result-box">

          <h2>Category : {result.category}</h2>

          <h2>Popularity</h2>

          <div className="bar">

            <div
              className="fill"
              style={{ width: result.popularity + "%" }}
            >
              {result.popularity}%
            </div>

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

    </div>

  );
};

export default TechStack;