import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  decrement,
  increment,
  init_pagination,
} from "../../store/reducers/pagination-slice";

const backButtonName = "< Back";
const nextButtonName = "Next >";

function Pagination({ completeArray }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.paginationSlice.currentPage);
  const isLastPage = useSelector((state) => state.paginationSlice.isLastPage);
  const totalPages = useSelector((state) => state.paginationSlice.totalPages);

  useEffect(() => {
    dispatch(init_pagination({ completeArray }));
  }, [completeArray, dispatch]);

  const changePage = (method, amount) => {
    switch (method) {
      case "INCREMENT":
        dispatch(increment({ completeArray, amount }));
        break;

      case "DECREMENT":
        dispatch(decrement({ completeArray, amount }));
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

  const BackButton =
    currentPage === 1 ? (
      ""
    ) : (
      <button onClick={decrementPageHandler}>{backButtonName}</button>
    );

  const ForwardButton = isLastPage ? (
    ""
  ) : (
    <button onClick={incementPageHandler}>{nextButtonName}</button>
  );

  return (
    <div>
      {BackButton}
      <span>{`${currentPage} of ${totalPages}`}</span>
      {ForwardButton}
    </div>
  );
}

export default Pagination;
