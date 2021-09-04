import { useDispatch, useSelector } from "react-redux";

import { cart_add_remove_product } from "../../../store/cart/cartActions";
import styles from "./Product.module.scss";

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
  const currentStateProducts = useSelector(
    (state) => state.productsReducers.products
  );
  const currentStateCartProducts = useSelector(
    (state) => state.cartReducers.products
  );
  const discounts = useSelector((state) => state.cartReducers.discounts);

  const addTocartHandler = () => {
    dispatch(
      cart_add_remove_product({
        currentStateProducts,
        currentStateCartProducts,
        discounts,
        productID: id,
        amount: 1,
      })
    );
  };

  return (
    <div className={styles.Product}>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Category: {category}</p>
      <p>Amount: {amount}</p>
      <p>Price: {price}</p>
      <img src={image} alt="product" />
      <button onClick={addTocartHandler}>Add to cart</button>
    </div>
  );
};

export default Product;
