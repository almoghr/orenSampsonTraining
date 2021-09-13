import { takeLatest } from "redux-saga/effects";

import {
  authLoginSignupHandler,
  authLogoutHandler,
  checkIfLoggedIn,
} from "./auth/sagas";
import { AUTH_LOGIN_SIGNUP, AUTH_LOGOUT, CHECKIFLOGGEDIN } from "./auth/types";

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
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(AUTH_LOGIN_SIGNUP, authLoginSignupHandler);
  yield takeLatest(AUTH_LOGOUT, authLogoutHandler);
  yield takeLatest(CART_ADD_REMOVE_PRODUCT, addRemoveProductHandler);
  yield takeLatest(CART_SEND_TRANSACTION, sendTransactionHandler);
  yield takeLatest(CART_GET_DISCOUNTS, getDiscountsHandler);
  yield takeLatest(STARTUP, startupHandler);
  yield takeLatest(CHECKIFLOGGEDIN, checkIfLoggedIn);
}
