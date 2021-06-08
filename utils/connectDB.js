const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_URI = process.env.MONGO;

async function connectDB() {
  try {
    await mongoose.connect(CONNECTION_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.info("Database connect successful");
  } catch (error) {
    console.log("No connect DB", error);
    process.exit(1);
  }
}

module.exports = connectDB;
