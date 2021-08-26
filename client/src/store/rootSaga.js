import { takeLatest } from "redux-saga/effects";

import {
  PRODUCTS_GET,
  CATEGORIES_GET,
  AUTH_LOGIN_SIGNUP,
  AUTH_LOGOUT,
  STARTUP,
} from "./types";
import { GetProductsHandler } from "./sagas/productsSagas";
import { GetCategoriesHandler } from "./sagas/categoriesSagas";
import { authLoginSignupHandler } from "./sagas/auth/authLoginSignupSaga";
import { authLogoutHandler } from "./sagas/auth/authLogoutSaga";
import { startupHandler } from "./sagas/startupSagas";

export function* watcherSaga() {
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(AUTH_LOGIN_SIGNUP, authLoginSignupHandler);
  yield takeLatest(AUTH_LOGOUT, authLogoutHandler);
  yield takeLatest(STARTUP, startupHandler);
}
