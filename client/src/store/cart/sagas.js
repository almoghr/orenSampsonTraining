import { call, put, select } from "redux-saga/effects";

import * as cartActions from "./actions";
import * as loadingActions from "../loading/actions";
import * as messageQueueActions from "../messageQueue/actions";
import * as productsActions from "../products/actions";
import { CART_INITIAL_STATE } from "./reducers";
import { LOADING_INITIAL_STATE } from "../loading/reducers";
import { requestsendTransaction, requestGetDiscounts } from "../../api/cartAPI";
import { calculator } from "./sagaHelpers";
import * as messages from "../constants/messages";
import { TOKEN_NAME } from "../constants/auth";

export const currentProductsState = (state) => state.productsReducers.products;
export const currentCartProductsState = (state) => state.cartReducers.products;
export const discountsState = (state) => state.cartReducers.discounts;
const isDiscountAppliedState = (state) => state.cartReducers.isDiscountApplied;

export function* addRemoveProductHandler({ payload }) {
  const currentStateProducts = yield select(currentProductsState);
  const currentStateCartProducts = yield select(currentCartProductsState);
  const currentStateDiscounts = yield select(discountsState);

  try {
    if (payload.amount === 0) {
      throw new Error(messages.ACTION_FAILED);
    }

    const indexProduct = currentStateProducts.findIndex((product) => {
      return product.id === payload.productID;
    });

    if (indexProduct < 0) {
      throw new Error(messages.ACTION_FAILED);
    }

    const indexCartProduct = currentStateCartProducts.findIndex(
      (product) => product.id === payload.productID
    );

    let updatedcartProductAmount;

    if (indexCartProduct < 0) {
      if (payload.amount > 0) {
        //increase cart product amount
        updatedcartProductAmount = payload.amount;
      } else {
        //decrease cart product amount
        throw new Error(messages.ACTION_FAILED);
      }
    } else {
      updatedcartProductAmount = Math.max(
        payload.amount + currentStateCartProducts[indexCartProduct].amount,
        0
      );
    }

    let updatedProductAmount;
    const currentProductAmount = currentStateProducts[indexProduct].amount;

    if (payload.amount > 0) {
      //decrease product amount
      if (currentProductAmount < payload.amount) {
        throw new Error(messages.INVENTORY_EMPTY);
      } else {
        updatedProductAmount = currentProductAmount - payload.amount;
      }
    } else {
      //increase product amount
      updatedProductAmount = currentProductAmount + payload.amount;
    }

    if (payload.amount > 0) {
      if (indexCartProduct < 0) {
        const product = {
          id: payload.productID,
          amount: updatedcartProductAmount,
        };

        currentStateCartProducts.push(product);
      } else {
        currentStateCartProducts[indexCartProduct].amount =
          updatedcartProductAmount;
      }
    } else {
      currentStateCartProducts[indexCartProduct].amount =
        updatedcartProductAmount;
    }

    currentStateProducts[indexProduct].amount = updatedProductAmount;

    const {
      isDiscountApplied,
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
    } = yield call(calculator, {
      currentStateProducts,
      currentStateCartProducts,
      currentStateDiscounts,
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
    yield put(productsActions.products_prodcuts_setter(currentStateProducts));
  } catch (error) {
    yield put(
      messageQueueActions.messagequeue_addMessage({
        type: "error",
        content: error.message,
      })
    );
  }
}

export function* sendTransactionHandler() {
  const currentStateCartProducts = yield select(currentCartProductsState);
  const currentStateDiscounts = yield select(discountsState);
  const currentStateIsDiscount = yield select(isDiscountAppliedState);

  try {
    yield put(
      loadingActions.loading_isloading_setter(!LOADING_INITIAL_STATE.isLoading)
    );

    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      throw new Error(messages.NOT_LOGGED_IN_TRANSACTION);
    }

    const payload = {
      productsAndAmountArr: currentStateCartProducts,
      discountID: currentStateIsDiscount ? currentStateDiscounts[0].id : null,
    };

    yield call(requestsendTransaction, payload, token);

    yield put(cartActions.cart_send_transaction_success());
  } catch (error) {
    const err =
      error.message ||
      error.response?.data?.message ||
      messages.API_CALL_FAILED;

    yield put(cartActions.cart_send_transaction_failure(err));
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
    yield put(
      messageQueueActions.messagequeue_addMessage({
        type: "error",
        content: error.message,
      })
    );
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
    loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "success",
      content: "Transaction sent successfully",
    })
  );
}

export function* sendTransactionFailureHandler({ payload }) {
  yield put(
    loadingActions.loading_isloading_setter(LOADING_INITIAL_STATE.isLoading)
  );

  yield put(
    messageQueueActions.messagequeue_addMessage({
      type: "error",
      content: payload,
    })
  );
}

export function* clearCartHandler() {
  try {
    yield put(cartActions.cart_send_transaction_success());
  } catch (error) {
    yield put(
      messageQueueActions.messagequeue_addMessage({
        type: "error",
        content: "error clearing cart",
      })
    );
  }
}
