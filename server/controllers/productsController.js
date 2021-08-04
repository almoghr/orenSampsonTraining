const Product = require("../models/product");

const { successfulResponse } = require("../constants/responses");

exports.getProdcuts = async (req, res, next) => {
  let productsArr;
  try {
    productsArr = await Product.find({}).lean();
    if (!productsArr) {
      throw new Error("products array empty");
    }
  } catch (error) {
    console.log(`error`, error);
  }

  return res.status(successfulResponse.status).json(productsArr);
};
