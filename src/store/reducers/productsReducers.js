import * as types from "../types";

const PRODUCTS_SLICE_INITIAL_STATE = {
  products: [],
  loading: false,
  error: null,
};

const reducer = (state = PRODUCTS_SLICE_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
