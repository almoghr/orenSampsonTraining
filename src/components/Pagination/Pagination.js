import { useState, useEffect } from "react";

import { PRODUCTS_PER_PAGE } from "../../constants/productsManager";

const backButtonName = "< Back";
const nextButtonName = "Next >";

function Pagination({ products, setSlicedFunc }) {
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
    setSlicedFunc(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  const changePage = (method, amount) => {
    switch (method) {
      case "INCREMENT":
        const endIndex = (currentPage + amount) * PRODUCTS_PER_PAGE;
        if (endIndex > products.length + 1) {
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
    currentPage === 1 ? '' : (
      <button onClick={decrementPageHandler}>{backButtonName}</button>
    );
  const ForwardButton = lastPage ? '' : (
    <button onClick={incementPageHandler}>{nextButtonName}</button>
  );

  return (
    <div>
      {BackButton}
      <span>current page: {currentPage}</span>
      {ForwardButton}
    </div>
  );
}

export default Pagination;
