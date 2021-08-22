import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  get_prodcuts_requested,
  get_prodcuts_success,
  get_prodcuts_failure,
} from "../actions/productsActions";
import { API_CALL_FAILED, PRODUCTS_ARRAY_EMPTY } from "../constants/messages";

const requestGetProducts = async (payload) => {
  let fetchedData;
  try {
    const config = {
      headers: {
        category: payload,
      },
      withCredentials: true,
    };
    fetchedData = await axios.get(
      "http://localhost:8080/api/products/getproducts",
      config
    );
  } catch (error) {
    throw new Error(API_CALL_FAILED);
  }

  return fetchedData;
};

export function* GetProductsHandler(action) {
  try {
    yield put(get_prodcuts_requested());

    const { data } = yield call(requestGetProducts.bind(this, action.payload));

    if (!data) {
      throw new Error(PRODUCTS_ARRAY_EMPTY);
    }

    yield put(get_prodcuts_success(data));
  } catch (error) {
    yield put(get_prodcuts_failure(error.message));
    toast(error.message);
  }
}
