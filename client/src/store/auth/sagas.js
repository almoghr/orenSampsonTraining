import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import { requestAuth } from "../../api/authAPI";
import { TOKEN_NAME } from "../constants/auth";
import {
  auth_isLoggedin_setter,
  auth_failure,
  auth_login_success,
  auth_signup_success,
} from "./actions";
import { AUTH_INITIAL_STATE } from "./reducers";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";
import {
  loadinganderror_isloading_setter,
  loadinganderror_error_setter,
} from "../loadingAndError/actions";

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(
      loadinganderror_isloading_setter(!LOADINGANDERROR_INITIAL_STATE.isLoading)
    );

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

  yield put(auth_isLoggedin_setter(AUTH_INITIAL_STATE.isLoggedin));
}

export function* checkIfLoggedIn() {
  const token = yield localStorage.getItem(TOKEN_NAME);

  if (token) {
    yield put(auth_login_success());
  }
}

export function* authLoginSuccessHandler() {
  yield put(auth_isLoggedin_setter(!AUTH_INITIAL_STATE.isLoggedin));

  yield put(
    loadinganderror_isloading_setter(LOADINGANDERROR_INITIAL_STATE.isLoading)
  );

  yield put(loadinganderror_error_setter(LOADINGANDERROR_INITIAL_STATE.error));
}

export function* authSignupSuccessHandler() {
  yield put(
    loadinganderror_isloading_setter(LOADINGANDERROR_INITIAL_STATE.isLoading)
  );

  yield put(loadinganderror_error_setter(LOADINGANDERROR_INITIAL_STATE.error));
}

export function* authFailureHandler({ payload }) {
  yield put(
    loadinganderror_isloading_setter(LOADINGANDERROR_INITIAL_STATE.isLoading)
  );

  yield put(loadinganderror_error_setter(payload));
}
