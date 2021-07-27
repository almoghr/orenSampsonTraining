import { call, put } from "redux-saga/effects";

import { requestGetProducts } from "../requests/products-slice";
import { setProducts } from "../../../reducers/products-slice";

export function* handleGetProducts(action) {
  try {
    const response = yield call(requestGetProducts);
    const { data } = response;
    if (!data) {
      throw new Error("products array from api call is empty");
    }

    yield put(setProducts(data));
  } catch (error) {
    console.log(error);
  }
}
