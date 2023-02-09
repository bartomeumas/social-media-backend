const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Express imports
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", require("./routes/postRoutes"));

// Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log("listening on port " + port);
});
