import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as productsActions from "./actions";
import * as loadingAndErrorActions from "../loadingAndError/actions";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";
import { requestGetProducts } from "../../api/productsAPI";
import { PRODUCTS_ARRAY_EMPTY } from "../constants/messages";

export function* getProductsHandler({ payload }) {
  try {
    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        !LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    const { data } = yield call(requestGetProducts, payload);

    if (!data?.length) {
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

    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    yield put(productsActions.get_prodcuts_success(productsArr));
  } catch (error) {
    yield put(productsActions.get_prodcuts_failure(error.message));
    toast(error.message);
  }
}

export function* getProductsSuccessHandler({ payload }) {
  yield put(productsActions.products_prodcuts_setter(payload));

  yield put(
    loadingAndErrorActions.loadingAndError_error_setter(
      LOADINGANDERROR_INITIAL_STATE.error
    )
  );
}

export function* getProductsfailureHandler({ payload }) {
  yield put(loadingAndErrorActions.loadingAndError_error_setter(payload));
}
