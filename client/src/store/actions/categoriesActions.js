import * as types from "../types";

export const getCategories = () => ({
  type: types.GET_CATEGORIES,
});

export const getCategoriesRequested = () => ({
  type: types.GET_CATEGORIES_REQUESTED,
});

export const getCategoriesSuccess = (payload) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload,
});
export const getCategoriesFailure = (payload) => ({
  type: types.GET_CATEGORIES_FAILURE,
  payload,
});
