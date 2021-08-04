import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  getProdcutsRequested,
  getProdcutsSuccess,
  getProdcutsFailure,
} from "../actions/productsActions";
import { API_CALL_FAILED, ARRAY_EMPTY } from "../constants/messages";

const requestGetProducts = async () => {
  let fetchedData;
  try {
    fetchedData = await axios.get(
      "http://localhost:8080/api/products/getproducts"
    );
  } catch (error) {
    throw new Error(API_CALL_FAILED);
  }

  return fetchedData;
};

export function* GetProductsHandler() {
  try {
    yield put(getProdcutsRequested());

    const { data } = yield call(requestGetProducts);

    if (!data) {
      throw new Error(ARRAY_EMPTY);
    }

    yield put(getProdcutsSuccess(data));
  } catch (error) {
    yield put(getProdcutsFailure(error.message));
    toast(error.message);
  }
}
