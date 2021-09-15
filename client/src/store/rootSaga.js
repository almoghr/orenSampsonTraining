import { takeLatest } from "redux-saga/effects";

import * as authTypes from "./auth/types";
import * as authSagas from "./auth/sagas";

import * as cartTypes from "./cart/types";
import * as cartSagas from "./cart/sagas";

import * as categoriesTypes from "./categories/types";
import * as categoriesSagas from "./categories/sagas";

import { GetProductsHandler } from "./products/sagas";
import { PRODUCTS_GET } from "./products/types";

import { startupHandler } from "./startup/sagas";
import { STARTUP } from "./startup/types";

export function* watcherSaga() {
  //AUTH////////////////////////////////////////////////////////////////////////////////////
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
  //PRODUCTS////////////////////////////////////////////////////////////////////////////////
  yield takeLatest(
    cartTypes.CART_ADD_REMOVE_PRODUCT,
    cartSagas.addRemoveProductHandler
  );
  yield takeLatest(
    cartTypes.CART_SEND_TRANSACTION,
    cartSagas.sendTransactionHandler
  );
  yield takeLatest(cartTypes.CART_GET_DISCOUNTS, cartSagas.getDiscountsHandler);
  yield takeLatest(
    cartTypes.CART_SEND_TRANSACTION_SUCCESS,
    cartSagas.sendTransactionSuccessHandler
  );
  yield takeLatest(
    cartTypes.CART_SEND_TRANSACTION_FAILURE,
    cartSagas.sendTransactionFailureHandler
  );
  //CATEGORIES//////////////////////////////////////////////////////////////////////////////
  yield takeLatest(
    categoriesTypes.CATEGORIES_GET,
    categoriesSagas.getCategoriesHandler
  );
  yield takeLatest(
    categoriesTypes.CATEGORIES_GET_SUCCESS,
    categoriesSagas.getCategoriesSuccessHandler
  );
  yield takeLatest(
    categoriesTypes.CATEGORIES_GET_FAILURE,
    categoriesSagas.getCategoriesfailureHandler
  );
  //PRODUCTS////////////////////////////////////////////////////////////////////////////////
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);

  yield takeLatest(STARTUP, startupHandler);
}
