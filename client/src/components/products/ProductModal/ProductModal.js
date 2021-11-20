import React from "react";
import PriceFormatter from "../../general/PriceFormater/PriceFormatter";

import styles from "./ProductModal.module.scss";

const ProductModal = (props) => {
  const cssClasses = [
    styles["ProductModal"],
    props.show ? styles["ProductModalOpen"] : styles["ProductModalClosed"],
  ];

  const Amount = props.isCart
    ? `${props.amount} added to cart`
    : props.showAddToCartBtn
    ? `${props.amount} left in stock`
    : `${props.amount} purchased`;

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
        <p>{Amount}</p>
        <PriceFormatter price={props.price} />
      </div>
    </div>
  );
};

export default ProductModal;
