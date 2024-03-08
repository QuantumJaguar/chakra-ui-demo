const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

// Apply CORS configuration for the entire application
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
const PORT = 3000;

app.get("/api/", (req, res) => {
  res.send("Express on Vercel");
});
// Define a route to serve JSON data from db.json

app.get("/api/tasks", (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.setHeader("Content-Type", "application/json");
      res.json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
      res.status(500).json({ error: "JSON Parsing Error" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
