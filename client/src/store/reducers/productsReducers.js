import * as types from "../types";

const PRODUCTS_INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
};

const reducer = (state = PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PRODUCTS_GET_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case types.PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    case types.PRODUCTS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case types.PRODUCTS_RESET_STATE:
      return {
        ...PRODUCTS_INITIAL_STATE,
      };

    default:
      return { ...state };
  }
};

export default reducer;
