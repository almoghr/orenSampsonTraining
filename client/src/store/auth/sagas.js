import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import * as authActions from "./actions";
import * as loadingAndErrorActions from "../loadingAndError/actions";
import { requestAuth } from "../../api/authAPI";
import { TOKEN_NAME } from "../constants/auth";
import { AUTH_INITIAL_STATE } from "./reducers";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        !LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    yield call(requestAuth, payload);

    if (payload.isLoginMode) {
      yield put(authActions.auth_login_success());
      yield put(push("/"));
    } else {
      yield put(authActions.auth_signup_success());
    }
  } catch (error) {
    yield put(authActions.auth_failure(error.message));
    toast(error.message);
  }
}

export function* authLogoutHandler() {
  yield localStorage.removeItem(TOKEN_NAME);

  yield put(authActions.auth_isLoggedin_setter(AUTH_INITIAL_STATE.isLoggedin));
}

export function* checkIfLoggedIn() {
  const token = yield localStorage.getItem(TOKEN_NAME);

  if (token) {
    yield put(authActions.auth_login_success());
  }
}

export function* authLoginSuccessHandler() {
  yield put(authActions.auth_isLoggedin_setter(!AUTH_INITIAL_STATE.isLoggedin));

  yield put(
    loadingAndErrorActions.loadingAndError_isloading_setter(
      LOADINGANDERROR_INITIAL_STATE.isLoading
    )
  );

  yield put(
    loadingAndErrorActions.loadingAndError_error_setter(
      LOADINGANDERROR_INITIAL_STATE.error
    )
  );
}

export function* authSignupSuccessHandler() {
  yield put(
    loadingAndErrorActions.loadingAndError_isloading_setter(
      LOADINGANDERROR_INITIAL_STATE.isLoading
    )
  );

  yield put(
    loadingAndErrorActions.loadingAndError_error_setter(
      LOADINGANDERROR_INITIAL_STATE.error
    )
  );
}

export function* authFailureHandler({ payload }) {
  yield put(
    loadingAndErrorActions.loadingAndError_isloading_setter(
      LOADINGANDERROR_INITIAL_STATE.isLoading
    )
  );

  yield put(loadingAndErrorActions.loadingAndError_error_setter(payload));
}
