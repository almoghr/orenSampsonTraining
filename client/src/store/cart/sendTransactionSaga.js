import { call, put } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";

import {
  cart_send_transaction_requested,
  cart_send_transaction_failure,
  cart_send_transaction_success,
} from "./cartActions";
import { TOKEN_NAME, AUTH_HEADER_NAME } from "../constants/auth";
import { NOT_LOGGED_IN, API_CALL_FAILED } from "../constants/messages";

const requestsendTransaction = async (payload, token) => {
  try {
    const headers = {
      [AUTH_HEADER_NAME]: `Bearer ${token}`,
    };

    await axios.post(
      "http://localhost:8080/api/transactions/addtransaction",
      payload,
      {
        headers,
      }
    );
  } catch (error) {
    throw new Error(error?.response?.data?.message || API_CALL_FAILED);
  }
};

export function* sendTransactionHandler({ payload }) {
  try {
    yield put(cart_send_transaction_requested());

    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      throw new Error(NOT_LOGGED_IN);
    }

    yield call(requestsendTransaction, payload, token);
    yield put(cart_send_transaction_success());
  } catch (error) {
    const err =
      error?.message || error?.response?.data?.message || API_CALL_FAILED;
    yield put(cart_send_transaction_failure(err));
    toast(err);
  }
}
