import React, { useState } from "react";
import "../styles/Companies.css";

const Companies = () => {

  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const companies = [

    { name: "Apple", location: "Hyderabad", desc: "Product based IT company" },
    { name: "Infosys", location: "Hyderabad", desc: "Service IT company" },
    { name: "TCS", location: "Hyderabad", desc: "Software services" },

    { name: "Microsoft", location: "Bangalore", desc: "Cloud and software" },
    { name: "Google", location: "Bangalore", desc: "AI and search" },
    { name: "Wipro", location: "Bangalore", desc: "IT services" },

    { name: "Amazon", location: "Chennai", desc: "AWS and web services" },
    { name: "Zoho", location: "Chennai", desc: "Product company" },

    { name: "IBM", location: "Pune", desc: "Cloud and AI" },
    { name: "Accenture", location: "Pune", desc: "IT consulting" },

    { name: "Capgemini", location: "Mumbai", desc: "Software company" },
    { name: "Cognizant", location: "Mumbai", desc: "IT services" },

  ];


  // get unique cities
  const cities = [...new Set(companies.map(c => c.location))];


  const handleSearch = () => {
    setSelectedCity(city);
  };


  const showCity = (c) => {
    setSelectedCity(c);
  };


  const filtered = companies.filter(c =>
    c.location.toLowerCase().includes(selectedCity.toLowerCase())
  );


  return (

    <div className="companies-page">

      <h1 className="companies-title">
        Companies By City
      </h1>


      {/* search */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={handleSearch}>
          Find
        </button>

      </div>


      {/* city options */}

      <div className="city-list">

        {cities.map((c, i) => (

          <button
            key={i}
            className="city-btn"
            onClick={() => showCity(c)}
          >
            {c}
          </button>

        ))}

      </div>


      {/* result */}

      {selectedCity && (

        <div className="result-box">

          <h2>
            IT Companies in {selectedCity}
          </h2>

          {filtered.length === 0 ? (

            <p>No companies found</p>

          ) : (

            <ul>

              {filtered.map((c, i) => (

                <li key={i}>
                  <b>{c.name}</b> — {c.desc}
                </li>

              ))}

            </ul>

          )}

        </div>

      )}

    </div>

  );
};

export default Companies;