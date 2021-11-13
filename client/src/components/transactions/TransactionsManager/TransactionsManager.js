import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import Transaction from "../Transactions/Transaction";
import * as transactionsActions from "../../../store/transactions/actions";

function TransactionsManager() {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactionsReducers.transactions
  );

  const isLoading = useSelector((state) => state.loadingReducers.isLoading);

  const transactionsComponents = transactions.map((transaction, index) => (
    <Transaction
      createdAt={transaction.createdAt}
      productsAndAmound={transaction.productsAndAmound}
      totalPrice={transaction.totalPrice}
      key={index}
    />
  ));

  useEffect(() => {
    dispatch(transactionsActions.transactions_get_transactions());
  }, [dispatch]);

  return (
    <div>
      <div>{transactionsComponents}</div>;
      <ClipLoader loading={isLoading} size={150} />
    </div>
  );
}

export default TransactionsManager;
