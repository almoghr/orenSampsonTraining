import styles from "./Product.module.scss";

const Product = ({title}) => {
  return (
    <div className={styles.Product}>
      <h1>{title}</h1>
    </div>
  );
};

export default Product;
