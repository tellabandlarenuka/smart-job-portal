import React, { useState } from "react";
import "../styles/Roles.css";

function Roles() {

  const [roleInput, setRoleInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [jobs, setJobs] = useState([]);

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
    "Database Developer"
  ];


  // multiple companies per role

  const allJobs = [

    { company:"TCS", role:"Software Engineer", salary:"6 LPA", rating:4, type:"Service", location:"Hyderabad" },
    { company:"Infosys", role:"Software Engineer", salary:"5.5 LPA", rating:3, type:"Service", location:"Bangalore" },
    { company:"Wipro", role:"Software Engineer", salary:"6 LPA", rating:3, type:"Service", location:"Chennai" },

    { company:"Infosys", role:"Python Developer", salary:"5 LPA", rating:3, type:"Service", location:"Bangalore" },
    { company:"TCS", role:"Python Developer", salary:"6 LPA", rating:4, type:"Service", location:"Hyderabad" },

    { company:"Wipro", role:"Java Developer", salary:"5.5 LPA", rating:3, type:"Service", location:"Chennai" },
    { company:"Accenture", role:"Java Developer", salary:"7 LPA", rating:4, type:"Service", location:"Pune" },

    { company:"Zoho", role:"Web Developer", salary:"8 LPA", rating:4, type:"Product", location:"Chennai" },
    { company:"TCS", role:"Web Developer", salary:"6 LPA", rating:3, type:"Service", location:"Hyderabad" },

    { company:"IBM", role:"Data Scientist", salary:"12 LPA", rating:4, type:"Product", location:"Pune" },
    { company:"Google", role:"AI Engineer", salary:"25 LPA", rating:5, type:"Product", location:"Hyderabad" },
    { company:"Amazon", role:"Cloud Engineer", salary:"22 LPA", rating:5, type:"Product", location:"Bangalore" },
    { company:"Microsoft", role:"DevOps Engineer", salary:"18 LPA", rating:5, type:"Product", location:"Hyderabad" },

    { company:"Accenture", role:"Full Stack Developer", salary:"7 LPA", rating:4, type:"Service", location:"Chennai" },
    { company:"Meta", role:"Frontend Developer", salary:"20 LPA", rating:5, type:"Product", location:"Bangalore" },
    { company:"HCL", role:"Backend Developer", salary:"6 LPA", rating:3, type:"Service", location:"Noida" },

    { company:"Deloitte", role:"Cyber Security", salary:"10 LPA", rating:4, type:"Service", location:"Hyderabad" },
    { company:"Capgemini", role:"Testing Engineer", salary:"4.5 LPA", rating:3, type:"Service", location:"Hyderabad" },

    { company:"Paytm", role:"Mobile App Developer", salary:"11 LPA", rating:4, type:"Product", location:"Delhi" },
    { company:"Cisco", role:"Network Engineer", salary:"9 LPA", rating:4, type:"Product", location:"Bangalore" },
    { company:"Oracle", role:"Database Developer", salary:"10 LPA", rating:4, type:"Product", location:"Bangalore" }

  ];


  // search function

  const searchRole = (role) => {

    const r = role.toLowerCase();

    const filtered = allJobs.filter(
      j => j.role.toLowerCase().includes(r)
    );

    setSelectedRole(role);
    setJobs(filtered);
  };


  return (

    <div className="roles-page">

      <h1 className="roles-title">
        Search Job Role
      </h1>


      {/* search box */}

      <div className="search-area">

        <input
          type="text"
          placeholder="Enter role"
          value={roleInput}
          onChange={(e)=>setRoleInput(e.target.value)}
        />

        <button
          onClick={()=>searchRole(roleInput)}
        >
          Search
        </button>

      </div>


      {/* role buttons */}

      <div className="roles-list">

        {roles.map((r,i)=>(
          <button
            key={i}
            className="role-btn"
            onClick={()=>searchRole(r)}
          >
            {r}
          </button>
        ))}

      </div>



      {/* result table */}

      {selectedRole && jobs.length>0 && (

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

            {jobs.map((j,i)=>(
              <tr key={i}>
                <td>{j.company}</td>
                <td>{j.role}</td>
                <td>{j.salary}</td>
                <td>{"⭐".repeat(j.rating)}</td>
                <td>{j.type}</td>
                <td>{j.location}</td>
              </tr>
            ))}

          </tbody>

        </table>

      )}


      {selectedRole && jobs.length===0 && (
        <h2>No companies found</h2>
      )}

    </div>
  );
}

export default Roles;