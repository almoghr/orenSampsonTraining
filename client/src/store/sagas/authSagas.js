import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  auth_requested,
  auth_failure,
  auth_success,
} from "../actions/authActions";

import { API_CALL_FAILED } from "../constants/messages";

const requestAuth = async (payload) => {
  let response;
  try {
    if (!payload.isLoginMode) {
      response = await axios.put("http://localhost:8080/api/auth/signup", {
        email: payload.email,
        password: payload.password,
      });
    } else {
      response = await axios.post("http://localhost:8080/api/auth/login", {
        email: payload.email,
        password: payload.password,
      });
    }

    toast(response?.data?.message);
  } catch (error) {
    throw new Error(error?.response?.data?.message || API_CALL_FAILED);
  }
};

export function* authHandler(action) {
  try {
    yield put(auth_requested());

    yield call(requestAuth.bind(this, action.payload));

    yield put(auth_success());
  } catch (error) {
    yield put(auth_failure(error.message));
    toast(error.message);
  }
}
