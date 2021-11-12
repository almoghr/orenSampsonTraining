import { useDispatch } from "react-redux";

import * as cartActions from "../../../store/cart/actions";
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
}) => {
  const dispatch = useDispatch();

  const addTocartHandler = () => {
    dispatch(
      cartActions.cart_add_remove_product({
        productID: id,
        amount: 1,
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

  return (
    <div className={styles["Product"]}>
      <div>
        <img className={styles["Product-picture"]} src={image} alt="product" />
        <div className={styles["Product-details"]}>
          <p className={styles["Product-details__title"]}>{shortTitle}</p>
          <p>{category}</p>
          <p className={styles["Product-details__amount"]}>{amount}</p>
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
      <button className={styles["Product-button"]} onClick={addTocartHandler}>
        Add to cart
      </button>
    </div>
  );
};

export default Product;
