const Product = require("../models/product");

const { ALL_PRODUCTS } = require("../constants/products");
const { successfulResponse } = require("../constants/responses");

exports.getProdcuts = async (req, res, next) => {
  const category = req.get("category");

  let productsArr;
  try {
    if (category === ALL_PRODUCTS) {
      productsArr = await Product.find({}).lean();
    } else {
      productsArr = await Product.find({ category }).lean();
    }

    if (!productsArr) {
      throw new Error("products array empty");
    }
  } catch (error) {
    console.log(`error`, error);
  }

  return res.status(successfulResponse.status).json(productsArr);
};
