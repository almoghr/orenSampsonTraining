const SET_PRODUCTS = "setProducts";
const SET_PAGINATED_PRODUCTS = "setPaginatedProducts";

const PRODUCTS_SLICE_INITIAL_STATE = {
  products: [],
  paginatedProducts: [],
};

export const setProducts = (payload) => ({
  type: SET_PRODUCTS,
  payload,
});

export const setPaginatedProducts = (payload) => ({
  type: SET_PAGINATED_PRODUCTS,
  payload,
});

const reducer = (state = PRODUCTS_SLICE_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_PAGINATED_PRODUCTS:
      return {
        ...state,
        paginatedProducts: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
