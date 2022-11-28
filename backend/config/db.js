const mongoose = require("mongoose");

// all mongoose methods are asynchronus, they return a promise
// if connection fails, make sure url is correct,or that you have defined user access well and
// that access from you ip is allowed (from the db settings in mongoDB)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
