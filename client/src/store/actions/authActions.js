import * as types from "../types";

export const auth = (payload) => ({
  type: types.AUTH,
  payload,
});

export const auth_requested = () => ({
  type: types.AUTH_REQUESTED,
});

export const auth_success = () => ({
  type: types.AUTH_SUCCESS,
});

export const auth_failure = (payload) => ({
  type: types.AUTH_FAILURE,
  payload,
});
