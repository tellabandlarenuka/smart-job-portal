
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// USER ROUTES
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

// 404
app.use((req, res) => {
  res.status(404).send("Route not found ❌");
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
