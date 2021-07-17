import styles from "./Products.module.scss";
import Product from "../Product/Product";

const Products = ({ products }) => {
  const renderProducts = products.map((product) => (
    <Product
      title={product.title}
      description={product.description}
      category={product.category}
      price={product.price}
      image={product.image}
      key={product.id}
    />
  ));

  return <div className={styles.Products}>{renderProducts}</div>;
};

export default Products;
