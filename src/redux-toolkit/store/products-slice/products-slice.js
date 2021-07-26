import { createSlice } from "@reduxjs/toolkit";

import { PRODUCTS_SLICE_INITIAL_STATE } from "../../constants/products-slice";

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: PRODUCTS_SLICE_INITIAL_STATE,
  reducers: {
    setProdcuts(state, action) {
      state.products = action.payload;
    },
    setSlicedProdcuts(state, action) {
      state.slicedProducts = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
