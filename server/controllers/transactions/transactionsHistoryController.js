const Transaction = require("../../models/transaction");
const {
  userNotLoggedIn,
  serverError,
  successfulResponse,
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  // if (!res.locals.isAuth) {
  //   return res
  //     .status(userNotLoggedIn.status)
  //     .json({ message: userNotLoggedIn.message });
  // }
  // const userID = res.locals.payload.sub;
  const userID = "610ee02761c8dd4bd0bf9254";

  let transactions;
  try {
    transactions = await Transaction.find(
      { userID },
      { _id: 0, __v: 0, updatedAt: 0, userID: 0, discountID: 0 }
    )
      .populate([
        {
          path: "productsAndAmount",
          populate: {
            path: "productID",
          },
        },
      ])
      .sort({
        createdAt: "desc",
      });
    if (!transactions) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res.status(successfulResponse.status).json({ transactions });
};
