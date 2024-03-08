const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.get("/tasks", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the Express API
module.exports = app;
