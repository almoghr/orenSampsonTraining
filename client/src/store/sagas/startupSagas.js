import { put, call } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import { TOKEN_NAME } from "../constants/auth";
import { auth_login_success } from "../actions/authActions";
import { cart_save_discounts } from "../actions/cartActions";
import { API_CALL_FAILED } from "../constants/messages";

const requestGetDiscounts = async (payload) => {
  let fetchedData;
  try {
    fetchedData = await axios.get(
      "http://localhost:8080/api/transactions/getdiscounts"
    );
    if (!fetchedData) {
      throw new Error();
    }
  } catch (error) {
    const err = error?.response?.data?.message || API_CALL_FAILED;
    throw new Error(err);
  }

  return fetchedData;
};

export function* startupHandler(action) {
  //check if logged in
  const token = yield localStorage.getItem(TOKEN_NAME);

  if (token) {
    yield put(auth_login_success());
  }

  //retrive discounts
  try {
    const { data } = yield call(requestGetDiscounts.bind(this));

    if (data?.discounts?.length > 0) {
      const dicounts = data.discounts.map((discount) => ({
        priceRequired: discount.priceRequired,
        percentage: discount.percentage,
      }));

      yield put(cart_save_discounts(dicounts));
    }
    console.log(`data?.discounts?.length`, data?.discounts?.length);
  } catch (error) {
    toast(error.message);
  }
}