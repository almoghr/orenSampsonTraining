const SET_PRODUCTS = "products_setProducts";

const PRODUCTS_SLICE_INITIAL_STATE = {
  products: [],
};

export const setProducts = (payload) => ({
  type: SET_PRODUCTS,
  payload,
});

const reducer = (state = PRODUCTS_SLICE_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
