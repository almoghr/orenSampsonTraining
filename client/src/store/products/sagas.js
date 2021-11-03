import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as productsActions from "./actions";
import * as loadingAndErrorActions from "../loadingAndError/actions";
import * as paginationActions from "../pagination/actions";
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

    if (!data?.productsArr.length) {
      throw new Error(PRODUCTS_ARRAY_EMPTY);
    }

    const productsArr = data.productsArr.map((product) => ({
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

    const payloadSuccess = {
      productsArr,
      totalPages: data.totalPages,
      page: data.page,
    };

    yield put(productsActions.get_prodcuts_success(payloadSuccess));
  } catch (error) {
    yield put(productsActions.get_prodcuts_failure(error.message));
    toast(error.message);
  }
}

export function* getProductsSuccessHandler({ payload }) {
  yield put(productsActions.products_prodcuts_setter(payload.productsArr));

  yield put(
    paginationActions.new_state_pagination({
      totalPages: payload.totalPages,
      page: payload.page,
    })
  );

  yield put(
    loadingAndErrorActions.loadingAndError_error_setter(
      LOADINGANDERROR_INITIAL_STATE.error
    )
  );
}

export function* getProductsfailureHandler({ payload }) {
  yield put(loadingAndErrorActions.loadingAndError_error_setter(payload));
}
