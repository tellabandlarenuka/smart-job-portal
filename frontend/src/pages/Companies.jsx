import React, { useState } from "react";
import "../styles/Companies.css";

const Companies = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [dbCompanies, setDbCompanies] = useState([]);
  const [message, setMessage] = useState("");

  // Keep the same five city buttons
  const cities = ["Hyderabad", "Bangalore", "Chennai", "Pune", "Mumbai"];

  // Fetch companies from MySQL
  const handleSearch = async (searchCity = city) => {
    if (!searchCity.trim()) {
      resetPage();
      return;
    }

    setSelectedCity(searchCity);
    setDbCompanies([]);
    setMessage("Loading...");

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/by-city?city=${encodeURIComponent(searchCity)}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch companies");
      }

      const data = await res.json();

      setDbCompanies(data);
      setMessage(data.length === 0 ? "Companies Will be added soon" : "");
    } catch (error) {
      console.log("Company Search Error:", error);
      setDbCompanies([]);
      setMessage("Unable to fetch company details.");
    }
  };

  // City button click
  const showCity = (c) => {
    setCity(c);
    handleSearch(c);
  };

  // Reset when input is cleared
  const resetPage = () => {
    setCity("");
    setSelectedCity("");
    setDbCompanies([]);
    setMessage("");
  };

  return (
    <div className="companies-page">
      <h1 className="companies-title">Companies By City</h1>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => {
            const value = e.target.value;
            setCity(value);

            if (!value.trim()) {
              resetPage();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={() => handleSearch()}>Find</button>
      </div>

      {/* CITY OPTIONS */}
      <div className="city-list">
        {cities.map((c, i) => (
          <button key={i} className="city-btn" onClick={() => showCity(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* RESULTS */}
      {selectedCity && (
        <div className="result-box">
          <h2>IT Companies in {selectedCity}</h2>

          {dbCompanies.length > 0 ? (
            <ul>
              {dbCompanies.map((c, i) => (
                <li key={i}>
                  <b>{c.company_name}</b> — {c.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Companies;
