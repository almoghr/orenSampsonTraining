import * as types from "./types";

export const loadingAndError_isloading_setter = (payload) => ({
  type: types.LOADINGANDERROR_ISLOADING_SETTER,
  payload,
});

export const loadingAndError_error_setter = (payload) => ({
  type: types.LOADINGANDERROR_ERROR_SETTER,
  payload,
});
