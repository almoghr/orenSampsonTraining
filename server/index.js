const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const initProductsSeeder = require("./seeders/productsSeeder");
const initcategoriesSeeder = require("./seeders/categoriesSeeder");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const app = express();

app.use(express.json());
app.use(cors());

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
  initcategoriesSeeder();
});

// routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);

// app start configuration
const port = 8080;

app.listen(port, function () {
  console.log("Running fake store backend on port " + port);
});
