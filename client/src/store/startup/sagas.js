import { put } from "redux-saga/effects";

import * as authActions from "../auth/actions";
import { cart_get_discounts } from "../cart/actions";
import { get_categories } from "../categories/actions";

export function* startupHandler() {
  //check if logged in
  yield put(authActions.auth_check_if_loggedIn());

  //retrive discounts
  yield put(cart_get_discounts());

  //retrive categories
  yield put(get_categories());
}
