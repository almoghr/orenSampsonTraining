import * as types from "../types";

export const get_categories = () => ({
  type: types.CATEGORIES_GET,
});

export const get_categories_requested = () => ({
  type: types.CATEGORIES_GET_REQUESTED,
});

export const get_categories_success = (payload) => ({
  type: types.CATEGORIES_GET_SUCCESS,
  payload,
});
export const get_categories_failure = (payload) => ({
  type: types.CATEGORIES_GET_FAILURE,
  payload,
});
