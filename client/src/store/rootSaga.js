import { takeLatest } from "redux-saga/effects";

import { GET_PRODUCTS, GET_CATEGORIES } from "./types";
import { GetProductsHandler } from "./sagas/productsSagas";
import { GetCategoriesHandler } from "./sagas/categoriesSagas";

export function* watcherSaga() {
  yield takeLatest(GET_PRODUCTS, GetProductsHandler);
  yield takeLatest(GET_CATEGORIES, GetCategoriesHandler);
}
