require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo");

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/todo", todoRoutes);

app.set("PORT", process.env.PORT || 8000);
const PORT = app.get("PORT");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
