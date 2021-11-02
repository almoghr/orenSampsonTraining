import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as categoriesActions from "./actions";
import * as loadingAndError from "../loadingAndError/actions";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";
import { requestGetCategories } from "../../api/categoriesAPI";
import * as messages from "../constants/messages";

export function* getCategoriesHandler() {
  try {
    yield put(
      loadingAndError.loadingAndError_isloading_setter(
        !LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    let { data } = yield call(requestGetCategories);

    if (!data) {
      throw new Error(messages.CATEGORIES_ARRAY_EMPTY);
    }

    data = data.map((category) => {
      return (
        category.category.charAt(0).toUpperCase() + category.category.slice(1)
      );
    });

    yield put(
      loadingAndError.loadingAndError_isloading_setter(
        LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    yield put(categoriesActions.get_categories_success(data));
  } catch (error) {
    const err =
      error.message ||
      error.response?.data?.message ||
      messages.API_CALL_FAILED;
    yield put(categoriesActions.get_categories_failure(err));
    toast(err);
  }
}

export function* getCategoriesSuccessHandler({ payload }) {
  yield put(categoriesActions.categories_categories_setter(payload));

  yield put(
    loadingAndError.loadingAndError_error_setter(
      LOADINGANDERROR_INITIAL_STATE.error
    )
  );
}

export function* getCategoriesfailureHandler({ payload }) {
  yield put(loadingAndError.loadingAndError_error_setter(payload));
}
