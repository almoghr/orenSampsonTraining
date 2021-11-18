import React from "react";

import Products from "../../products/Products/Products";
import styles from "./Transaction.module.scss";

const Transaction = (props) => {
  return (
    <div>
      <div className={styles["labels"]}>
        <span>Purchase Date:</span>
        {` ${props.createdAt}`}
      </div>
      <Products
        products={props.productsAndAmound}
        isTransactions={true}
        isCart={false}
      />
      <div className={styles["labels"]}>
        {props.discountPercentage &&
          `There was a ${props.discountPercentage}% discount`}
      </div>
      <div className={styles["labels"]}>
        <span>Total Price:</span>
        {` ${props.totalPrice}`}
      </div>
      <br></br>
      <hr />
    </div>
  );
};

export default Transaction;
