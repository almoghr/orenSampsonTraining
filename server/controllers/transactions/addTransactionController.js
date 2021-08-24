const User = require("../../models/user");
const Discount = require("../../models/discount");
const Product = require("../../models/product");
const Transaction = require("../../models/transaction");
const {
  userNotLoggedIn,
  serverError,
  transactionCreated,
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  console.log();
  // if (!res.locals.isAuth) {
  //   return res
  //     .status(userNotLoggedIn.status)
  //     .json({ message: userNotLoggedIn.message });
  // }

  // const userID = res.locals.payload.sub;
  const userID = "610ee02761c8dd4bd0bf9254";

  const { productsAndAmountArr } = req.body;
  let { discountID } = req.body;

  if (!productsAndAmountArr?.length) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  try {
    const user = await User.findOne({ _id: userID }).lean();
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let discount;
  if (discountID) {
    try {
      discount = await Discount.findOne({ _id: discountID }).lean();
      if (!discount) {
        throw new Error();
      }
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }
  }

  let totalPrice = 0;
  const productsModelArr = [];
  for (let i = 0; i < productsAndAmountArr.length; i++) {
    const transActionProductID = productsAndAmountArr[i].productID;
    const transActionAmount = productsAndAmountArr[i].amount;
    try {
      const product = await Product.findOne({ _id: transActionProductID });
      if (!product || product.amount < transActionAmount) {
        throw new Error();
      }
      product.amount -= transActionAmount;
      productsModelArr.push(product);
      totalPrice += transActionAmount * product.price;
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }
  }

  // console.log(`discountID`, discountID);
  // console.log(`discount`, discount);
  // console.log(`totalPrice`, totalPrice);
  // console.log(`productsModelArr`, productsModelArr);

  if (discount) {
    const { priceRequired, percentage } = discount;
    if (totalPrice >= priceRequired) {
      totalPrice = (totalPrice * ((100 - percentage) / 100)).toFixed(2);
    } else {
      discountID = null;
    }
  }

  // console.log(`totalPrice`, totalPrice);

  const transaction = new Transaction({
    userID,
    discountID,
    productsAndAmount: productsAndAmountArr,
    totalPrice,
  });

  // console.log(`transaction`, transaction);

  for (const productModel of productsModelArr) {
    try {
      await productModel.save();
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }
  }

  try {
    await transaction.save();
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res
    .status(transactionCreated.status)
    .json({ message: transactionCreated.message });
};
