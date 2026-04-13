const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// ✅ Better CORS setup (important for React)
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Import routes
const userRoutes = require("./routes/user");

// ✅ Use routes
app.use("/api/users", userRoutes);

// ✅ Handle unknown routes (optional but good)
app.use((req, res) => {
  res.status(404).send("Route not found ❌");
});

// ✅ Start server (bind properly)
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});