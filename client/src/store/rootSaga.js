import { takeLatest } from "redux-saga/effects";

import { authLoginSignupHandler } from "./auth/sagas";
import { authLogoutHandler } from "./auth/sagas";
import { AUTH_LOGIN_SIGNUP } from "./auth/types";
import { AUTH_LOGOUT } from "./auth/types";

import { addRemoveProductHandler } from "./cart/sagas";
import { sendTransactionHandler } from "./cart/sagas";
import { CART_ADD_REMOVE_PRODUCT } from "./cart/types";
import { CART_SEND_TRANSACTION } from "./cart/types";

import { GetCategoriesHandler } from "./categories/sagas";
import { CATEGORIES_GET } from "./categories/types";

import { GetProductsHandler } from "./products/productsSagas";
import { PRODUCTS_GET } from "./products/types";
import { STARTUP } from "./startup/types";
import { startupHandler } from "./startup/startupSagas";

export function* watcherSaga() {
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(AUTH_LOGIN_SIGNUP, authLoginSignupHandler);
  yield takeLatest(AUTH_LOGOUT, authLogoutHandler);
  yield takeLatest(STARTUP, startupHandler);
  yield takeLatest(CART_ADD_REMOVE_PRODUCT, addRemoveProductHandler);
  yield takeLatest(CART_SEND_TRANSACTION, sendTransactionHandler);
}
