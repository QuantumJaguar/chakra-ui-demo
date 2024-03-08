const express = require("express");
const app = express();
const fs = require("fs").promises; // Use fs.promises for asynchronous file operations
const cors = require("cors");
const path = require("path"); // Import the 'path' module

app.use(cors());

const PORT = 3000;

app.get("/api/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api/tasks", cors(), async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public/db.json"); // Adjust the file path as needed
    const contents = await fs.readFile(filePath, "utf-8");
    res.json(JSON.parse(contents)); // Assuming db.json contains valid JSON
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
