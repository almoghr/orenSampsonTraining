import { takeLatest } from "redux-saga/effects";

import * as authTypes from "./auth/types";
import * as authSagas from "./auth/sagas";

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
  yield takeLatest(
    authTypes.AUTH_LOGIN_SIGNUP,
    authSagas.authLoginSignupHandler
  );
  yield takeLatest(authTypes.AUTH_LOGOUT, authSagas.authLogoutHandler);
  yield takeLatest(
    authTypes.AUTH_LOGIN_SUCCESS,
    authSagas.authLoginSuccessHandler
  );
  yield takeLatest(
    authTypes.AUTH_SIGNUP_SUCCESS,
    authSagas.authSignupSuccessHandler
  );
  yield takeLatest(authTypes.AUTH_FAILURE, authSagas.authFailureHandler);
  yield takeLatest(authTypes.CHECKIFLOGGEDIN, authSagas.checkIfLoggedIn);

  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(CART_ADD_REMOVE_PRODUCT, addRemoveProductHandler);
  yield takeLatest(CART_SEND_TRANSACTION, sendTransactionHandler);
  yield takeLatest(CART_GET_DISCOUNTS, getDiscountsHandler);
  yield takeLatest(STARTUP, startupHandler);
}
