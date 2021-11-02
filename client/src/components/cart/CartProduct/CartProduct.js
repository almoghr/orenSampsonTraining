import styles from "./CartProduct.module.scss";

function CartProduct({ title, amount, price, image }) {
  return (
    <div className={styles.CartProduct}>
      <p>Title: {title}</p>
      <p>Amount: {amount}</p>
      <p>Price: {price}</p>
      <img src={image} alt="product" />
    </div>
  );
}

export default CartProduct;
