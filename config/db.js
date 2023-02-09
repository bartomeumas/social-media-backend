const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      colors.cyan.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(11);
  }
};

module.exports = connectDB;
