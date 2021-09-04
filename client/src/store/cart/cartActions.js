import * as types from "./types";

export const cart_send_transaction_requested = () => ({
  type: types.CART_SEND_TRANSACTION_REQUESTED,
});

export const cart_send_transaction_success = () => ({
  type: types.CART_SEND_TRANSACTION_SUCCESS,
});

export const cart_send_transaction_failure = (payload) => ({
  type: types.CART_SEND_TRANSACTION_FAILURE,
  errorMessage: payload,
});

//saga actions
export const cart_add_remove_product = (payload) => ({
  type: types.CART_ADD_REMOVE_PRODUCT,
  payload,
});

export const cart_send_transaction = (payload) => ({
  type: types.CART_SEND_TRANSACTION,
  payload,
});
