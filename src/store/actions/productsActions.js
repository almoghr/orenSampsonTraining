import * as types from "../types";

export const getProducts = () => ({
  type: types.GET_PRODUCTS,
});

export const getProdcutsRequested = () => ({
  type: types.GET_PRODUCTS_REQUESTED,
});

export const getProdcutsSuccess = (payload) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload,
});

export const getProdcutsFailure = (payload) => ({
  type: types.GET_PRODUCTS_FAILURE,
  payload,
});
