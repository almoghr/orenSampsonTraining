import { takeLatest } from "redux-saga/effects";

import { PRODUCTS_GET } from "./products/types";
import { CATEGORIES_GET } from "./categories/types";
import { AUTH_LOGIN_SIGNUP } from "./auth/types";
import { AUTH_LOGOUT } from "./auth/types";
import { STARTUP } from "./startup/types";
import { CART_ADD_REMOVE_PRODUCT } from "./cart/types";
import { CART_SEND_TRANSACTION } from "./cart/types";
import { GetProductsHandler } from "./products/productsSagas";
import { GetCategoriesHandler } from "./categories/categoriesSagas";
import { authLoginSignupHandler } from "./auth/authLoginSignupSaga";
import { authLogoutHandler } from "./auth/authLogoutSaga";
import { startupHandler } from "./startup/startupSagas";
import { addRemoveProductHandler } from "./cart/addRemoveProductSaga";
import { sendTransactionHandler } from "./cart/sendTransactionSaga";

export function* watcherSaga() {
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(AUTH_LOGIN_SIGNUP, authLoginSignupHandler);
  yield takeLatest(AUTH_LOGOUT, authLogoutHandler);
  yield takeLatest(STARTUP, startupHandler);
  yield takeLatest(CART_ADD_REMOVE_PRODUCT, addRemoveProductHandler);
  yield takeLatest(CART_SEND_TRANSACTION, sendTransactionHandler);
}
