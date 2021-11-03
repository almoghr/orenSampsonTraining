import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_products } from "../../store/products/actions";

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

  const category = useSelector((state) => state.productsReducers.category);

  const incementPageHandler = () => {
    dispatch(get_products({ category, page: currentPage + 1 }));
  };

  const decrementPageHandler = () => {
    dispatch(get_products({ category, page: currentPage - 1 }));
  };

  const BackButton = currentPage !== 1 && (
    <button onClick={decrementPageHandler}>{backButtonName}</button>
  );
  const ForwardButton = !isLastPage && (
    <button onClick={incementPageHandler}>{nextButtonName}</button>
  );

  const Content = !!(completeArray?.length !== 0) && (
    <div>
      {BackButton}
      <span>{`${currentPage} of ${totalPages}`}</span>
      {ForwardButton}
    </div>
  );

  return <Fragment>{Content}</Fragment>;
}

export default Pagination;
