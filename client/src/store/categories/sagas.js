import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { requestGetCategories } from "../../api/categoriesAPI";
import {
  get_categories_requested,
  get_categories_failure,
  get_categories_success,
} from "./actions";
import { API_CALL_FAILED, CATEGORIES_ARRAY_EMPTY } from "../constants/messages";

export function* GetCategoriesHandler() {
  try {
    yield put(get_categories_requested());

    let { data } = yield call(requestGetCategories);

    if (!data) {
      throw new Error(CATEGORIES_ARRAY_EMPTY);
    }

    data = data.map((category) => category.category);

    yield put(get_categories_success(data));
  } catch (error) {
    const err =
      error.message || error.response?.data?.message || API_CALL_FAILED;
    yield put(get_categories_failure(err));
    toast(err);
  }
}
