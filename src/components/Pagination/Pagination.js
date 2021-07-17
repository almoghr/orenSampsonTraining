import { useState, useEffect } from "react";

import { PRODUCTS_PER_PAGE } from "../../constants/productsManager";

const backButtonName = "< Back";
const nextButtonName = "Next >";

function Pagination({ props }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const products = props.products;
  const setSlicedProducts = props.setSlicedProducts;

  useEffect(() => {
    if (
      (currentPage - 1) * PRODUCTS_PER_PAGE < products.length &&
      currentPage * PRODUCTS_PER_PAGE >= products.length
    ) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = currentPage * PRODUCTS_PER_PAGE;
    setSlicedProducts(products.slice(startIndex, endIndex));
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

  const handleIncementPage = () => {
    changePage("INCREMENT", 1);
  };
  const handleDecrementPage = () => {
    changePage("DECREMENT", 1);
  };

  const backButton =
    currentPage === 1 ? null : (
      <button onClick={handleDecrementPage}>{backButtonName}</button>
    );
  const forwardButton = lastPage ? null : (
    <button onClick={handleIncementPage}>{nextButtonName}</button>
  );

  return (
    <div>
      {backButton}
      <span>current page: {currentPage}</span>
      {forwardButton}
    </div>
  );
}

export default Pagination;
