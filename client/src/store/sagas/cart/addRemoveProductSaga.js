import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  cart_isDiscountApplied_setter,
  cart_products_setter,
  cart_totalPrice_before_discount_setter,
  cart_totalPrice_after_discount_setter,
} from "../../actions/cartActions";
import { ACTION_FAILED, INVENTORY_EMPTY } from "../../constants/messages";

const calculator = (payload) => {
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

export function* addRemoveProductHandler({ payload }) {
  const {
    currentStateProducts,
    currentStateCartProducts,
    discounts,
    productID,
    amount,
  } = payload;

  try {
    if (amount === 0) {
      throw new Error(ACTION_FAILED);
    }

    const currentStateProductAmount = currentStateProducts.find((product) => {
      return product.id === productID;
    })?.amount;

    if (!currentStateProductAmount) {
      throw new Error(ACTION_FAILED);
    }

    const i = currentStateCartProducts.findIndex(
      (product) => product.id === productID
    );

    let currentStateCartProductAmount;

    if (amount > 0) {
      if (i < 0) {
        currentStateCartProductAmount = amount;
      } else {
        currentStateCartProductAmount =
          amount + currentStateCartProducts[i].amount;
      }
    } else {
      if (i < 0) {
        throw new Error(ACTION_FAILED);
      } else {
        currentStateCartProductAmount = Math.max(
          amount + currentStateCartProducts[i].amount,
          0
        );
      }
    }

    if (amount > 0) {
      if (currentStateProductAmount - currentStateCartProductAmount < 0) {
        throw new Error(INVENTORY_EMPTY);
      }
    }

    if (amount > 0) {
      if (i < 0) {
        const product = {
          id: productID,
          amount: currentStateCartProductAmount,
        };
        currentStateCartProducts.push(product);
      } else {
        currentStateCartProducts[i].amount = currentStateCartProductAmount;
      }
    } else {
      currentStateCartProducts[i].amount = currentStateCartProductAmount;
    }

    const {
      isDiscountApplied,
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
    } = yield call(
      calculator.bind(this, {
        currentStateProducts,
        currentStateCartProducts,
        discounts,
      })
    );

    yield put(cart_isDiscountApplied_setter(isDiscountApplied));
    yield put(cart_products_setter(currentStateCartProducts));
    yield put(cart_totalPrice_before_discount_setter(totalPriceBeforeDiscount));
    yield put(cart_totalPrice_after_discount_setter(totalPriceAfterDiscount));
  } catch (error) {
    toast(error.message);
  }
}
