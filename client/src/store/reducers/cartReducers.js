import * as types from "../types";

const CART_INITIAL_STATE = {
  discounts: null,
  isDiscountApplied: false,
  products: [],
  totalPrice: 0,
};

const reducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CART_DISCOUNTS_SETTER:
      return {
        ...state,
        discounts: action.discounts,
      };

    case types.CART_ISDISCOUNTAPPLIED_SETTER:
      return {
        ...state,
        isDiscountApplied: action.isDiscountApplied,
      };

    case types.CART_PRODUCTS_SETTER:
      return {
        ...state,
        products: action.cartProducts,
      };

    case types.CART_TOTALPRICE_SETTER:
      return {
        ...state,
        totalPrice: action.totalPrice,
      };

    case types.CART_RESET_STATE:
      return {
        ...CART_INITIAL_STATE,
      };

    default:
      return { ...state };
  }
};

export default reducer;
