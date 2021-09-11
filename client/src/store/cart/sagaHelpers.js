import { ACTION_FAILED } from "../constants/messages";

export const calculator = (payload) => {
  let isDiscountApplied = false;
  const {
    currentStateProducts,
    currentStateCartProducts: cartProducts,
    discounts,
  } = payload;

  const selectedDiscount = discounts?.length ? discounts[0] : null;

  let totalPriceBeforeDiscount = 0;

  for (const cartProduct of cartProducts) {
    const currentStateProduct = currentStateProducts.find(
      (currentStateProduct) => currentStateProduct.id === cartProduct.id
    );

    if (!currentStateProduct) {
      throw new Error(ACTION_FAILED);
    }

    totalPriceBeforeDiscount += currentStateProduct.price * cartProduct.amount;
  }

  let totalPriceAfterDiscount = totalPriceBeforeDiscount;

  if (selectedDiscount) {
    if (totalPriceBeforeDiscount >= selectedDiscount.priceRequired) {
      isDiscountApplied = true;
      totalPriceAfterDiscount *= (100 - selectedDiscount.percentage) / 100;
    }
  }
  totalPriceBeforeDiscount = totalPriceBeforeDiscount.toFixed(2);
  totalPriceAfterDiscount = totalPriceAfterDiscount.toFixed(2);

  return {
    isDiscountApplied,
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
  };
};
