import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import { requestAuth } from "../../api/authAPI";
import { TOKEN_NAME } from "../constants/auth";
import {
  auth_requested,
  auth_failure,
  auth_login_success,
  auth_signup_success,
} from "./actions";

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(auth_requested());

    yield call(requestAuth, payload);

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

export function* authLogoutHandler() {
  yield localStorage.removeItem(TOKEN_NAME);
}

export function* checkIfLoggedIn() {
  const token = yield localStorage.getItem(TOKEN_NAME);

  if (token) {
    yield put(auth_login_success());
  }
}
