import { takeLatest } from "redux-saga/effects";

import {
  authLoginSignupHandler,
  authLogoutHandler,
  checkIfLoggedIn,
  authLoginSuccessHandler,
  authSignupSuccessHandler,
  authFailureHandler,
} from "./auth/sagas";
import {
  AUTH_LOGIN_SIGNUP,
  AUTH_LOGOUT,
  CHECKIFLOGGEDIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGNUP_SUCCESS,
  AUTH_FAILURE,
} from "./auth/types";

import {
  addRemoveProductHandler,
  sendTransactionHandler,
  getDiscountsHandler,
} from "./cart/sagas";
import {
  CART_ADD_REMOVE_PRODUCT,
  CART_SEND_TRANSACTION,
  CART_GET_DISCOUNTS,
} from "./cart/types";

import { GetCategoriesHandler } from "./categories/sagas";
import { CATEGORIES_GET } from "./categories/types";

import { GetProductsHandler } from "./products/sagas";
import { PRODUCTS_GET } from "./products/types";

import { startupHandler } from "./startup/sagas";
import { STARTUP } from "./startup/types";

export function* watcherSaga() {
  yield takeLatest(AUTH_LOGIN_SIGNUP, authLoginSignupHandler);
  yield takeLatest(AUTH_LOGOUT, authLogoutHandler);
  yield takeLatest(AUTH_LOGIN_SUCCESS, authLoginSuccessHandler);
  yield takeLatest(AUTH_SIGNUP_SUCCESS, authSignupSuccessHandler);
  yield takeLatest(AUTH_FAILURE, authFailureHandler);

  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(CART_ADD_REMOVE_PRODUCT, addRemoveProductHandler);
  yield takeLatest(CART_SEND_TRANSACTION, sendTransactionHandler);
  yield takeLatest(CART_GET_DISCOUNTS, getDiscountsHandler);
  yield takeLatest(STARTUP, startupHandler);
  yield takeLatest(CHECKIFLOGGEDIN, checkIfLoggedIn);
}
