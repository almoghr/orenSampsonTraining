import { takeLatest } from "redux-saga/effects";

import { PRODUCTS_GET, CATEGORIES_GET, AUTH } from "./types";
import { GetProductsHandler } from "./sagas/productsSagas";
import { GetCategoriesHandler } from "./sagas/categoriesSagas";
import { authHandler } from "./sagas/authSagas";

export function* watcherSaga() {
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
  yield takeLatest(AUTH, authHandler);
}
