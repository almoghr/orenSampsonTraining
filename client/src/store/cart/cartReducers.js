import clone from "lodash.clonedeep";

import * as types from "./types";

const CART_INITIAL_STATE = {
  discounts: null,
  isDiscountApplied: false,
  products: [],
  totalPriceBeforeDiscount: 0,
  totalPriceAfterDiscount: 0,
  isSendingTransaction: false,
  errorSendingTransaction: null,
};

const reducer = (state = clone(CART_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.CART_DISCOUNTS_SETTER:
      return {
        ...state,
        discounts: clone(action.discounts),
      };

    case types.CART_ISDISCOUNTAPPLIED_SETTER:
      return {
        ...state,
        isDiscountApplied: action.isDiscountApplied,
      };

    case types.CART_PRODUCTS_SETTER:
      return {
        ...state,
        products: clone(action.cartProducts),
      };

    case types.CART_TOTALPRICE_BEFORE_DISCOUNT_SETTER:
      return {
        ...state,
        totalPriceBeforeDiscount: action.totalPriceBeforeDiscount,
      };

    case types.CART_TOTALPRICE_AFTER_DISCOUNT_SETTER:
      return {
        ...state,
        totalPriceAfterDiscount: action.totalPriceAfterDiscount,
      };

    case types.CART_SEND_TRANSACTION_REQUESTED:
      return {
        ...state,
        isSendingTransaction: true,
      };

    case types.CART_SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        isDiscountApplied: CART_INITIAL_STATE.isDiscountApplied,
        products: clone(CART_INITIAL_STATE.products),
        totalPriceBeforeDiscount: CART_INITIAL_STATE.totalPriceBeforeDiscount,
        totalPriceAfterDiscount: CART_INITIAL_STATE.totalPriceAfterDiscount,
        isSendingTransaction: CART_INITIAL_STATE.isSendingTransaction,
        errorSendingTransaction: CART_INITIAL_STATE.errorSendingTransaction,
      };

    case types.CART_SEND_TRANSACTION_FAILURE:
      return {
        ...state,
        isSendingTransaction: false,
        errorSendingTransaction: action.errorMessage,
      };

    case types.CART_RESET_STATE:
      return clone(CART_INITIAL_STATE);

    default:
      return { ...state };
  }
};

export default reducer;
