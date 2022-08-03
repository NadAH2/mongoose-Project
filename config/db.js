const mongoose = require("mongoose");
const config = require("config");

const db = config.get("MONGO_URI");
//connect to db

const connectToDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoDB");
  } catch (err) {
    console.error("could not connect to mongoDB", err);
    process.exit(1);
  }
};
module.exports = connectToDB;
