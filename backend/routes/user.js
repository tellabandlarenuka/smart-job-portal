
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received:", req.body);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);
      return res.status(500).send(err.message);
    }

    res.send("User registered successfully ✅");
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);
      return res.status(500).send(err.message);
    }

    if (result.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    res.send("Login successful ✅");
  });
});

// COMPANIES
router.get("/companies", (req, res) => {
  const search = req.query.name;

  let sql;
  let values;

  if (search && search.trim() !== "") {
    sql = "SELECT * FROM companies WHERE name LIKE ?";
    values = [`%${search}%`];
  } else {
    sql = "SELECT * FROM companies";
    values = [];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);
      return res.status(500).send(err.message);
    }

    res.send(result);
  });
});

// COMPANIES BY CITY
router.get("/by-city", (req, res) => {
  const city = req.query.city;

  const sql = `
    SELECT company_name, location, description
    FROM company_locations
    WHERE location LIKE ?
  `;

  db.query(sql, [`%${city}%`], (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);
      return res.status(500).send(err.message);
    }

    res.send(result);
  });
});

router.get("/job-roles", (req, res) => {
  const role = req.query.role;

  const sql = `
    SELECT company, role, salary, rating, type, location
    FROM company_roles
    WHERE role LIKE ?
  `;

  db.query(sql, [`%${role}%`], (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);
      return res.status(500).send(err.message);
    }

    res.send(result);
  });
});
module.exports = router;
