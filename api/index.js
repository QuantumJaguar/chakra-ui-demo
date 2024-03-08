// server.js
const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.get("/api/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api/tasks", cors(), async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public/db.json");
    const contents = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(contents));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export the Express app as a function
module.exports = app;
