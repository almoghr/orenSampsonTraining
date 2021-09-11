import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { requestsendTransaction } from "../../api/cartAPI";
import { calculator } from "./sagaHelpers";
import {
  cart_isDiscountApplied_setter,
  cart_products_setter,
  cart_totalPrice_before_discount_setter,
  cart_totalPrice_after_discount_setter,
  cart_send_transaction_requested,
  cart_send_transaction_failure,
  cart_send_transaction_success,
} from "./actions";
import {
  ACTION_FAILED,
  INVENTORY_EMPTY,
  NOT_LOGGED_IN,
  API_CALL_FAILED,
} from "../constants/messages";
import { TOKEN_NAME } from "../constants/auth";

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
    } = yield call(calculator, {
      currentStateProducts,
      currentStateCartProducts,
      discounts,
    });

    yield put(cart_isDiscountApplied_setter(isDiscountApplied));
    yield put(cart_products_setter(currentStateCartProducts));
    yield put(cart_totalPrice_before_discount_setter(totalPriceBeforeDiscount));
    yield put(cart_totalPrice_after_discount_setter(totalPriceAfterDiscount));
  } catch (error) {
    toast(error.message);
  }
}

export function* sendTransactionHandler({ payload }) {
  try {
    yield put(cart_send_transaction_requested());

    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      throw new Error(NOT_LOGGED_IN);
    }

    yield call(requestsendTransaction, payload, token);
    yield put(cart_send_transaction_success());
  } catch (error) {
    const err =
      error?.message || error?.response?.data?.message || API_CALL_FAILED;
    yield put(cart_send_transaction_failure(err));
    toast(err);
  }
}
