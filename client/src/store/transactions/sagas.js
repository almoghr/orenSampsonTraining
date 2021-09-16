import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as loadingAndErrorActions from "../loadingAndError/actions";
import { LOADINGANDERROR_INITIAL_STATE } from "../loadingAndError/reducers";
import * as transactionsActions from "../transactions/actions";

import { requestGetTransactions } from "../../api/transactionsAPI";
import * as messages from "../constants/messages";
import { TOKEN_NAME } from "../constants/auth";

export function* getTransactionsHandler() {
  try {
    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        !LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      throw new Error(messages.NOT_LOGGED_IN_TRANSACTIONS_HISTORY);
    }

    const { data } = yield call(requestGetTransactions, token);

    console.log(`data`, data);

    if (!data?.length) {
      throw new Error(messages.TRANSACTIONS_ARRAY_EMPTY);
    }

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

    yield put(transactionsActions.transactions_transactions_setter(data));
  } catch (error) {
    yield put(
      loadingAndErrorActions.loadingAndError_isloading_setter(
        LOADINGANDERROR_INITIAL_STATE.isLoading
      )
    );

    yield put(
      loadingAndErrorActions.loadingAndError_error_setter(error.message)
    );

    toast(error.message);
  }
}
