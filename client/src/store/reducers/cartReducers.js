import * as types from "../types";

const CART_INITIAL_STATE = {
  discounts: null,
  isDiscountApplied: false,
  products: [],
  totalPriceBeforeDiscount: 0,
  totalPriceAfterDiscount: 0,
  isSendingTransaction: false,
  errorSendingTransaction: null,
};

const getImmutableState = (state) => {
  const newState = { ...state };

  if (state.discounts?.length) {
    newState.discounts = [];
    for (const discount of state.discounts) {
      newState.discounts.push({ ...discount });
    }
  }

  if (state.products?.length) {
    newState.products = [];
    for (const cartProduct of state.products) {
      newState.products.push({ ...cartProduct });
    }
  }

  return newState;
};

const reducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CART_DISCOUNTS_SETTER:
      return {
        ...getImmutableState(state),
        discounts: action.discounts,
      };

    case types.CART_ISDISCOUNTAPPLIED_SETTER:
      return {
        ...getImmutableState(state),
        isDiscountApplied: action.isDiscountApplied,
      };

    case types.CART_PRODUCTS_SETTER:
      return {
        ...getImmutableState(state),
        products: action.cartProducts,
      };

    case types.CART_TOTALPRICE_BEFORE_DISCOUNT_SETTER:
      return {
        ...getImmutableState(state),
        totalPriceBeforeDiscount: action.totalPriceBeforeDiscount,
      };

    case types.CART_TOTALPRICE_AFTER_DISCOUNT_SETTER:
      return {
        ...getImmutableState(state),
        totalPriceAfterDiscount: action.totalPriceAfterDiscount,
      };

    case types.CART_SEND_TRANSACTION_REQUESTED:
      return {
        ...getImmutableState(state),
        isSendingTransaction: true,
      };

    case types.CART_SEND_TRANSACTION_SUCCESS:
      return {
        ...CART_INITIAL_STATE,
      };

    case types.CART_SEND_TRANSACTION_FAILURE:
      return {
        ...getImmutableState(state),
        isSendingTransaction: false,
        errorSendingTransaction: action.errorMessage,
      };

    case types.CART_RESET_STATE:
      return {
        ...CART_INITIAL_STATE,
      };

    default:
      return { ...getImmutableState(state) };
  }
};

export default reducer;
