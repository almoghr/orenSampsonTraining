import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as cartActions from "./actions";
import * as loadingAndErrorActions from "../loadingAndError/actions";
import { CART_INITIAL_STATE } from "./reducers";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";
import { requestsendTransaction, requestGetDiscounts } from "../../api/cartAPI";
import { calculator } from "./sagaHelpers";
import * as messages from "../constants/messages";
import { TOKEN_NAME } from "../constants/auth";

export function* addRemoveProductHandler({
  payload: {
    currentStateProducts,
    currentStateCartProducts,
    discounts,
    productID,
    amount,
  },
}) {
  try {
    if (amount === 0) {
      throw new Error(messages.ACTION_FAILED);
    }

    const currentStateProductAmount = currentStateProducts.find((product) => {
      return product.id === productID;
    })?.amount;

    if (!currentStateProductAmount) {
      throw new Error(messages.ACTION_FAILED);
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
        throw new Error(messages.ACTION_FAILED);
      } else {
        currentStateCartProductAmount = Math.max(
          amount + currentStateCartProducts[i].amount,
          0
        );
      }
    }

    if (amount > 0) {
      if (currentStateProductAmount - currentStateCartProductAmount < 0) {
        throw new Error(messages.INVENTORY_EMPTY);
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

    yield put(cartActions.cart_isDiscountApplied_setter(isDiscountApplied));
    yield put(cartActions.cart_products_setter(currentStateCartProducts));
    yield put(
      cartActions.cart_totalPrice_before_discount_setter(
        totalPriceBeforeDiscount
      )
    );
    yield put(
      cartActions.cart_totalPrice_after_discount_setter(totalPriceAfterDiscount)
    );
  } catch (error) {
    toast(error.message);
  }
}

export function* sendTransactionHandler({ payload }) {
  try {
    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        !LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      throw new Error(messages.NOT_LOGGED_IN);
    }

    yield call(requestsendTransaction, payload, token);
    yield put(cartActions.cart_send_transaction_success());
  } catch (error) {
    const err =
      error.message ||
      error.response?.data?.message ||
      messages.API_CALL_FAILED;
    yield put(cartActions.cart_send_transaction_failure(err));
    toast(err);
  }
}

export function* getDiscountsHandler() {
  try {
    const { data } = yield call(requestGetDiscounts);

    if (data?.discounts?.length > 0) {
      const dicounts = data.discounts.map((discount) => ({
        id: discount._id,
        priceRequired: discount.priceRequired,
        percentage: discount.percentage,
      }));

      yield put(cartActions.cart_discounts_setter(dicounts));
    }
  } catch (error) {
    toast(error.message);
  }
}

export function* sendTransactionSuccessHandler() {
  yield put(
    cartActions.cart_isDiscountApplied_setter(
      CART_INITIAL_STATE.isDiscountApplied
    )
  );

  yield put(cartActions.cart_products_setter(CART_INITIAL_STATE.products));

  yield put(
    cartActions.cart_totalPrice_before_discount_setter(
      CART_INITIAL_STATE.totalPriceBeforeDiscount
    )
  );

  yield put(
    cartActions.cart_totalPrice_after_discount_setter(
      CART_INITIAL_STATE.totalPriceAfterDiscount
    )
  );

  yield put(
    loadingAndErrorActions.loadingAndError_isloading_setter(
      LOADINGANDERROR_INITIAL_STATE.isLoading
    )
  );

  yield put(
    loadingAndErrorActions.loadingAndError_error_setter(
      LOADINGANDERROR_INITIAL_STATE.error
    )
  );
}

export function* sendTransactionFailureHandler({ payload }) {
  yield put(
    loadingAndErrorActions.loadingAndError_isloading_setter(
      LOADINGANDERROR_INITIAL_STATE.isLoading
    )
  );

  yield put(loadingAndErrorActions.loadingAndError_error_setter(payload));
}
