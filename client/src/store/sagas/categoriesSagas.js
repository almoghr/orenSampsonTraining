import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  getCategoriesRequested,
  getCategoriesFailure,
  getCategoriesSuccess,
} from "../actions/categoriesActions";
import { API_CALL_FAILED, CATEGORIES_ARRAY_EMPTY } from "../constants/messages";

const requestGetCategories = async () => {
  let fetchedData;
  try {
    fetchedData = await axios.get(
      "http://localhost:8080/api/categories/getcategories"
    );
  } catch (error) {
    throw new Error(API_CALL_FAILED);
  }

  return fetchedData;
};

export function* GetCategoriesHandler() {
  try {
    yield put(getCategoriesRequested());

    let { data } = yield call(requestGetCategories);

    if (!data) {
      throw new Error(CATEGORIES_ARRAY_EMPTY);
    }

    data = data.map((category) => category.category);

    yield put(getCategoriesSuccess(data));
  } catch (error) {
    yield put(getCategoriesFailure(error.message));
    toast(error.message);
  }
}
