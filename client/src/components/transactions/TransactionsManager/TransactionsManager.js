import { useDispatch } from "react-redux";

import * as transactionsActions from "../../../store/transactions/actions";

function TransactionsManager() {
  const dispatch = useDispatch();

  const getTransactionsHistoryHandler = () => {
    dispatch(transactionsActions.transactions_get_transactions());
  };

  return (
    <div>
      <button onClick={getTransactionsHistoryHandler}>Get Transactions</button>
    </div>
  );
}

export default TransactionsManager;
