const express = require("express");
const app = express();
const fs = require("fs").promises;
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
const PORT = 3000;

app.get("/api/", (req, res) => {
  res.send("Express on Vercel");
});
// Define a route to serve JSON data from db.json

app.get("/api/tasks", cors(), async (req, res) => {
  try {
    const filePath = "db.json"; // Adjust the file path as needed
    const contents = await fs.readFile(filePath, "utf-8");
    res.send(contents);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
