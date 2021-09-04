import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";
import { toast } from "react-toastify";

import {
  auth_requested,
  auth_failure,
  auth_login_success,
  auth_signup_success,
} from "./authActions";
import { TOKEN_NAME } from "../constants/auth";
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

      if (!response) {
        throw new Error(API_CALL_FAILED);
      }

      const { token } = response.data;

      localStorage.setItem(TOKEN_NAME, token);
    }

    toast(response?.data?.message);
  } catch (error) {
    throw new Error(
      error?.message || error?.response?.data?.message || API_CALL_FAILED
    );
  }
};

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(auth_requested());

    yield call(requestAuth.bind(this, payload));

    if (payload.isLoginMode) {
      yield put(auth_login_success());
      yield put(push("/"));
    } else {
      yield put(auth_signup_success());
    }
  } catch (error) {
    yield put(auth_failure(error.message));
    toast(error.message);
  }
}
