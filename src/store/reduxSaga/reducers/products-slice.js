// const slicedProducts = [
//   {
//     id: 1,
//     title: 1,
//     description: 1,
//     category: 1,
//     price: 1,
//   },
//   {
//     id: 2,
//     title: 2,
//     description: 2,
//     category: 2,
//     price: 2,
//   },
// ];

const PRODUCTS_SLICE_INITIAL_STATE = {
  products: [],
  slicedProducts: [],
};

const reducer = (state = PRODUCTS_SLICE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "setProducts":
      return {
        ...state,
        products: action.payload,
      };

    case "setSlicedProducts":
      return {
        ...state,
        slicedProducts: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
