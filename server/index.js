const express = require("express");
const mongoose = require("mongoose");

const initProductsSeeder = require("./seeders/products");

const app = express();

app.use(express.json());

// database configuration
const MONGODB_URI = "mongodb://localhost:27017/fakeStore";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(MONGODB_URI, options);

mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + MONGODB_URI);
  initProductsSeeder();
});
