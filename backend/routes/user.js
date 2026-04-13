const express = require("express");
const router = express.Router();
const db = require("../config/db");   // check path

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

module.exports = router;