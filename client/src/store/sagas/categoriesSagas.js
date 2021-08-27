import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  get_categories_requested,
  get_categories_failure,
  get_categories_success,
} from "../actions/categoriesActions";
import { API_CALL_FAILED, CATEGORIES_ARRAY_EMPTY } from "../constants/messages";

const requestGetCategories = async () => {
  let fetchedData;
  try {
    fetchedData = await axios.get(
      "http://localhost:8080/api/categories/getcategories"
    );
  } catch (error) {
    throw new Error(error?.response?.data?.message || API_CALL_FAILED);
  }

  return fetchedData;
};

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
    yield put(get_categories_failure(error.message));
    toast(error.message);
  }
}
