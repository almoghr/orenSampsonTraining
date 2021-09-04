import { takeLatest } from "redux-saga/effects";

import {
  PRODUCTS_GET,
  CATEGORIES_GET,
  AUTH_LOGIN_SIGNUP,
  AUTH_LOGOUT,
  STARTUP,
  CART_ADD_REMOVE_PRODUCT,
  CART_SEND_TRANSACTION,
} from "./types";
import { GetProductsHandler } from "./sagas/productsSagas";
import { GetCategoriesHandler } from "./sagas/categoriesSagas";
import { authLoginSignupHandler } from "./sagas/auth/authLoginSignupSaga";
import { authLogoutHandler } from "./sagas/auth/authLogoutSaga";
import { startupHandler } from "./sagas/startupSagas";
import { addRemoveProductHandler } from "./sagas/cart/addRemoveProductSaga";
import { sendTransactionHandler } from "./sagas/cart/sendTransactionSaga";

export function* watcherSaga() {
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(AUTH_LOGIN_SIGNUP, authLoginSignupHandler);
  yield takeLatest(AUTH_LOGOUT, authLogoutHandler);
  yield takeLatest(STARTUP, startupHandler);
  yield takeLatest(CART_ADD_REMOVE_PRODUCT, addRemoveProductHandler);
  yield takeLatest(CART_SEND_TRANSACTION, sendTransactionHandler);
}
