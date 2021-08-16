const Product = require("../models/product");

const { ALL_PRODUCTS } = require("../constants/products");
const { successfulResponse } = require("../constants/responses");

exports.getProdcuts = async (req, res, next) => {
  const category = req.get("category");

  let productsArr;
  try {
    productsArr = await Product.find(
      category === ALL_PRODUCTS ? {} : { category }
    ).lean();

    if (!productsArr) {
      throw new Error("products array empty");
    }
  } catch (error) {
    console.log(`error`, error);
  }

  return res.status(successfulResponse.status).json(productsArr);
};
