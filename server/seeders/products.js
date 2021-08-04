const axios = require("axios");

const Product = require("../models/product");

const initProductsSeeder = () => {
  Product.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      let productsArr;
      try {
        productsArr = await axios.get("https://fakestoreapi.com/products");
        if (!productsArr) {
          throw new Error("fetched empty products");
        }
        productsArr = productsArr.data;

        console.log(`productsArr`, productsArr);
      } catch (error) {
        console.log(`error`, error);
      }

      for (const product of productsArr) {
        const productModel = new Product({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        });

        try {
          await productModel.save();
          console.log(`productModel saved with id `, product.id);
        } catch (error) {
          console.log(`error`, error);
        }
      }
    }
  });
};

module.exports = initProductsSeeder;
