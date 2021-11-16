import { useState } from "react";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

import * as cartActions from "../../../store/cart/actions";
import Backdrop from "../../Layout/Backdrop/Backdrop";
import ProductModal from "../ProductModal/ProductModal";
import styles from "./Product.module.scss";

const charCount = 50;

const Product = ({
  id,
  title,
  description,
  category,
  price,
  amount,
  image,
  isTransactions,
}) => {
  const dispatch = useDispatch();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const addTocartHandler = () => {
    dispatch(
      cartActions.cart_add_remove_product({
        id,
        title,
        description,
        category,
        price,
        amount: 1,
        image,
      })
    );
  };

  const shortTitle =
    title.slice(0, charCount) + (title.length > charCount ? "..." : "");

  const dollarUSLocale = Intl.NumberFormat("en-US");

  const priceObj = {
    whole: dollarUSLocale.format(Math.floor(price)),
    remainder: Math.floor((price - Math.floor(price)) * 100) || "00",
  };

  const openProductModalHandler = () => {
    setIsProductModalOpen(true);
  };

  const closeProductModalHandler = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div className={styles["Product"]}>
      <div
        className={styles["ProductWrapper"]}
        onClick={openProductModalHandler}
      >
        <div>
          <Backdrop showBackDrop={isProductModalOpen} />
          <OutsideClickHandler onOutsideClick={closeProductModalHandler}>
            <ProductModal
              title={title}
              description={description}
              category={category}
              priceObj={priceObj}
              amount={amount}
              image={image}
              isTransactions={isTransactions}
              show={isProductModalOpen}
            />
          </OutsideClickHandler>
        </div>
        <div>
          <img
            className={styles["Product-picture"]}
            src={image}
            alt="product"
          />
          <div className={styles["Product-details"]}>
            <p className={styles["Product-details__title"]}>{shortTitle}</p>
            <p>{category}</p>
            <p>
              {isTransactions && "purchased "}
              {amount}
              {isTransactions ? " units" : " left in stock"}
            </p>
            <p className={styles["Product-details__price"]}>
              <span>
                {priceObj.whole}
                <small>
                  <sup>{priceObj.remainder}</sup>
                </small>
              </span>
            </p>
          </div>
        </div>
      </div>
      {!isTransactions ? (
        <button className={styles["Product-button"]} onClick={addTocartHandler}>
          Add to cart
        </button>
      ) : null}
    </div>
  );
};

export default Product;
