const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
app.use(express.json());

const PORT = 3000;

app.get("/api/", cors(), (req, res) => {
  res.send("Express on Vercel");
});
// Define a route to serve JSON data from db.json

app.get("/api/tasks", cors(), (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const jsonData = JSON.parse(data);

      res.status(200).json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
      res.status(500).json({ error: "JSON Parsing Error" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
