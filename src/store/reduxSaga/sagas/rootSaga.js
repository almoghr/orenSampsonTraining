import { takeLatest } from "redux-saga/effects";

import { GET_PRODUCTS } from "../../reducers/sagaActions/products-slice";
import { handleGetProducts } from "./handlers/products-slice";

export function* watcherSaga() {
  yield takeLatest(GET_PRODUCTS, handleGetProducts);
}
