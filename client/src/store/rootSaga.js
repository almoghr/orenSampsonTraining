import { takeLatest } from "redux-saga/effects";

import { PRODUCTS_GET, CATEGORIES_GET } from "./types";
import { GetProductsHandler } from "./sagas/productsSagas";
import { GetCategoriesHandler } from "./sagas/categoriesSagas";

export function* watcherSaga() {
  yield takeLatest(PRODUCTS_GET, GetProductsHandler);
  yield takeLatest(CATEGORIES_GET, GetCategoriesHandler);
}
