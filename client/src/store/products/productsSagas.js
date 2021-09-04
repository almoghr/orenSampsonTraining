import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  get_prodcuts_requested,
  get_prodcuts_success,
  get_prodcuts_failure,
} from "./productsActions";
import { API_CALL_FAILED, PRODUCTS_ARRAY_EMPTY } from "../constants/messages";

const requestGetProducts = async (payload) => {
  let fetchedData;
  try {
    const config = {
      headers: {
        category: payload,
      },
    };
    fetchedData = await axios.get(
      "http://localhost:8080/api/products/getproducts",
      config
    );
  } catch (error) {
    throw new Error(error?.response?.data?.message || API_CALL_FAILED);
  }

  return fetchedData;
};

export function* GetProductsHandler({ payload }) {
  try {
    yield put(get_prodcuts_requested());

    const { data } = yield call(requestGetProducts.bind(this, payload));

    if (!data) {
      throw new Error(PRODUCTS_ARRAY_EMPTY);
    }

    const productsArr = data.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      amount: product.amount,
      image: product.image,
    }));

    yield put(get_prodcuts_success(productsArr));
  } catch (error) {
    yield put(get_prodcuts_failure(error.message));
    toast(error.message);
  }
}
