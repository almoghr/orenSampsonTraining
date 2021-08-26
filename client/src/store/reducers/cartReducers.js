import * as types from "../types";

const CART_INITIAL_STATE = {
  discounts: null,
  products: [],
  totalPrice: 0,
};

const reducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CART_SAVE_DISCOUNTS:
      return {
        ...state,
        discounts: action.payload,
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
