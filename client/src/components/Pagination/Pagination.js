import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  decrement,
  increment,
  init_pagination,
} from "../../store/actions/paginationActions";

const backButtonName = "< Back";
const nextButtonName = "Next >";

function Pagination({ completeArray }) {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state) => state.paginationReducers.currentPage
  );
  const isLastPage = useSelector(
    (state) => state.paginationReducers.isLastPage
  );
  const totalPages = useSelector(
    (state) => state.paginationReducers.totalPages
  );

  useEffect(() => {
    dispatch(init_pagination({ completeArray }));
  }, [completeArray, dispatch]);

  const changePage = (method, amount) => {
    switch (method) {
      case "INCREMENT":
        dispatch(increment({ completeArray, amount, currentPage }));
        break;

      case "DECREMENT":
        dispatch(decrement({ completeArray, amount, currentPage }));
        break;

      default:
        console.log(`selected method error`);
    }
  };

  const incementPageHandler = () => {
    changePage("INCREMENT", 1);
  };
  const decrementPageHandler = () => {
    changePage("DECREMENT", 1);
  };

  const BackButton = currentPage !== 1 && (
    <button onClick={decrementPageHandler}>{backButtonName}</button>
  );
  const ForwardButton = !isLastPage && (
    <button onClick={incementPageHandler}>{nextButtonName}</button>
  );

  const Content =
    !completeArray || completeArray.length === 0 ? null : (
      <div>
        {BackButton}
        <span>{`${currentPage} of ${totalPages}`}</span>
        {ForwardButton}
      </div>
    );

  return <Fragment>{Content}</Fragment>;
}

export default Pagination;
