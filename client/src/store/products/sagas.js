import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { requestGetProducts } from "../../api/productsAPI";
import {
  get_prodcuts_requested,
  get_prodcuts_success,
  get_prodcuts_failure,
} from "./actions";
import { PRODUCTS_ARRAY_EMPTY } from "../constants/messages";

export function* GetProductsHandler({ payload }) {
  try {
    yield put(get_prodcuts_requested());

    const { data } = yield call(requestGetProducts, payload);

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
