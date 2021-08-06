import * as types from "../types";

export const get_products = (payload = null) => ({
  type: types.PRODUCTS_GET,
  payload,
});

export const get_prodcuts_requested = () => ({
  type: types.PRODUCTS_GET_REQUESTED,
});

export const get_prodcuts_success = (payload) => ({
  type: types.PRODUCTS_GET_SUCCESS,
  payload,
});

export const get_prodcuts_failure = (payload) => ({
  type: types.PRODUCTS_GET_FAILURE,
  payload,
});

export const products_reset_state = () => ({
  type: types.PRODUCTS_RESET_STATE,
});
