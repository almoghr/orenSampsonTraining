import styles from "./Product.module.scss";

const Product = ({ title, description, category, price, image }) => {
  return (
    <div className={styles.Product}>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>category: {category}</p>
      <p>price: {price}</p>
      <img src={image} alt="product image" />
    </div>
  );
};

export default Product;
