const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

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
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading db.json:", err);
      return res.status(500).send("Internal Server Error");
    }

    try {
      const jsonData = JSON.parse(data);
      res.setHeader("Content-Type", "application/json");
      res.send(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
