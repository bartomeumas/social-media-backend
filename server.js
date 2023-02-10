const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Express imports
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log("listening on port " + port);
});
