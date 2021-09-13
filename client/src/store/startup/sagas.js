import { put } from "redux-saga/effects";

import { cart_get_discounts } from "../cart/actions";
import { get_categories } from "../categories/actions";
import { checkIfLoggedIn } from "../auth/actions";

export function* startupHandler() {
  //check if logged in
  yield put(checkIfLoggedIn());

  //retrive discounts
  yield put(cart_get_discounts());

  //retrive categories
  yield put(get_categories());
}
