const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
require("colors");

const connectToMongo = () => {
  const mongoURI = process.env.MONGO_URI;
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log(`Connected to MongoDB`.yellow.italic.underline.bold);
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: \n", error);
    });
};

module.exports = connectToMongo;
