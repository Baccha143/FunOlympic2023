const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/login";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongo");
  });
};
module.exports = connectToMongo;
