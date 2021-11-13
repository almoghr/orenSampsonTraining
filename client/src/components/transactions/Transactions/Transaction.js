import React from "react";

import Products from "../../products/Products/Products";

const Transaction = (props) => {
  return (
    <div>
      <div>Purchase Date: {` ${props.createdAt}`}</div>
      <Products products={props.productsAndAmound} isTransactions={true} />
      <div>Total Price: {props.totalPrice}</div>
    </div>
  );
};

export default Transaction;
