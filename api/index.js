const express = require("express");
const fs = require("fs").promises;
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = process.env.PORT || 3000;
const jsonData = require("./db.json");

// Define a route to serve JSON data from db.json
app.get("/api/tasks", async (req, res) => {
  try {
    // // Read the content of db.json
    // const data = await fs.readFile("db.json", "utf-8");
    // const jsonData = JSON.parse(data);

    // Send the JSON data as a response
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading db.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
