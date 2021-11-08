import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import * as authActions from "./actions";
import * as loadingAndErrorActions from "../loadingAndError/actions";
import { requestAuth } from "../../api/authAPI";
import { TOKEN_NAME, LOGGED_USER_EMAIL } from "../constants/auth";
import { AUTH_INITIAL_STATE } from "./reducers";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";

export function* authLoginSignupHandler({ payload }) {
  try {
    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        !LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    const authObj = yield call(requestAuth, payload);

    if (payload.isLoginMode) {
      yield put(authActions.auth_login_success(authObj));

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
  yield localStorage.removeItem(LOGGED_USER_EMAIL);

  yield put(
    authActions.auth_loggedUserEmail_setter(AUTH_INITIAL_STATE.loggedUserEmail)
  );
  yield put(authActions.auth_isLoggedin_setter(AUTH_INITIAL_STATE.isLoggedin));
}

export function* checkIfLoggedIn() {
  const token = yield localStorage.getItem(TOKEN_NAME);
  const loggedInUser = yield localStorage.getItem(LOGGED_USER_EMAIL);

  if (token && loggedInUser) {
    yield put(authActions.auth_login_success({ token, email: loggedInUser }));
  }
}

export function* authLoginSuccessHandler(payload) {
  localStorage.setItem(TOKEN_NAME, payload.payload.token);
  localStorage.setItem(LOGGED_USER_EMAIL, payload.payload.email);

  yield put(authActions.auth_loggedUserEmail_setter(payload.payload.email));
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
