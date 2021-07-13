import styles from "./Products.module.scss";

import Product from "../Product/Product";

function Products() {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(<Product key={i}></Product>);
  }

  return <div className={styles.Products}>{arr}</div>;
}

export default Products;
