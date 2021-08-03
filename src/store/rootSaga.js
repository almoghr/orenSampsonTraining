import { takeLatest } from "redux-saga/effects";

import { GET_PRODUCTS } from "./types";
import { GetProductsHandler } from "./sagas/productsSagas";

export function* watcherSaga() {
  yield takeLatest(GET_PRODUCTS, GetProductsHandler);
}
