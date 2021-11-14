import React from "react";

import styles from "./ProductModal.module.scss";

const ProductModal = (props) => {
  const cssClasses = [
    styles["ProductModal"],
    props.show ? styles["ProductModalOpen"] : styles["ProductModalClosed"],
  ];

  return (
    <div className={cssClasses.join(" ")}>
      <img
        className={styles["ProductModal-picture"]}
        src={props.image}
        alt="product"
      />
      <div>
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.category}</p>
        <p>
          {props.isTransactions && "purchased "}
          {props.amount}
          {props.isTransactions ? " units" : " left in stock"}
        </p>
        <p>
          <span>
            {props.priceObj.whole}
            <small>
              <sup>{props.priceObj.remainder}</sup>
            </small>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductModal;
