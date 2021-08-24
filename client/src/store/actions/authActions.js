import * as types from "../types";

export const auth_login_signup = (payload) => ({
  type: types.AUTH_LOGIN_SIGNUP,
  payload,
});

export const auth_requested = () => ({
  type: types.AUTH_REQUESTED,
});

export const auth_login_success = () => ({
  type: types.AUTH_LOGIN_SUCCESS,
});

export const auth_signup_success = () => ({
  type: types.AUTH_SIGNUP_SUCCESS,
});

export const auth_failure = (payload) => ({
  type: types.AUTH_FAILURE,
  payload,
});

export const auth_logout = () => ({
  type: types.AUTH_LOGOUT,
});
