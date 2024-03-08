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
app.get("/api/tasks", cors(), (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    try {
      if (err) throw err;

      const jsonData = JSON.parse(data);
      res.setHeader("Content-Type", "application/json");
      res.send(jsonData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
