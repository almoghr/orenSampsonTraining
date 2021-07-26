import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { PRODUCTS_PER_PAGE } from "../../constants/productsManager";

const backButtonName = "< Back";
const nextButtonName = "Next >";

function Pagination({ products, setSlicedFunc }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = currentPage * PRODUCTS_PER_PAGE;

    if (startIndex < products.length && endIndex >= products.length) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }

    dispatch(setSlicedFunc(products.slice(startIndex, endIndex)));
  }, [currentPage, products, setSlicedFunc, dispatch]);

  const changePage = (method, amount) => {
    switch (method) {
      case "INCREMENT":
        const startIndex = (currentPage + amount - 1) * PRODUCTS_PER_PAGE;
        if (!(startIndex < products.length)) {
          return;
        }

        setCurrentPage((prevPage) => prevPage + amount);
        break;

      case "DECREMENT":
        if (currentPage === 1) {
          return;
        }

        setCurrentPage((prevPage) => prevPage - amount);
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

  const ForwardButton = lastPage ? (
    ""
  ) : (
    <button onClick={incementPageHandler}>{nextButtonName}</button>
  );

  const totalAmountPages =
    products.length % PRODUCTS_PER_PAGE > 0
      ? Math.floor(products.length / PRODUCTS_PER_PAGE) + 1
      : Math.floor(products.length / PRODUCTS_PER_PAGE);

  return (
    <div>
      {BackButton}
      <span>{`${currentPage} of ${totalAmountPages}`}</span>
      {ForwardButton}
    </div>
  );
}

export default Pagination;
