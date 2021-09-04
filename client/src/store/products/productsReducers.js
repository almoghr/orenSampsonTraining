import * as types from "./types";

const PRODUCTS_INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
};

const getImmutableState = (state) => {
  const newState = { ...state };

  if (state.products?.length) {
    newState.products = [];
    for (const product of state.products) {
      newState.products.push({ ...product });
    }
  }

  return newState;
};

const reducer = (state = PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PRODUCTS_GET_REQUESTED:
      return {
        ...getImmutableState(state),
        isLoading: true,
      };

    case types.PRODUCTS_GET_SUCCESS:
      return {
        ...getImmutableState(state),
        isLoading: false,
        products: action.payload,
      };

    case types.PRODUCTS_GET_FAILURE:
      return {
        ...getImmutableState(state),
        isLoading: false,
        error: action.payload,
      };

    case types.PRODUCTS_RESET_STATE:
      return {
        ...PRODUCTS_INITIAL_STATE,
      };

    default:
      return { ...getImmutableState(state) };
  }
};

export default reducer;
