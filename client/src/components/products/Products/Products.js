import styles from "./Products.module.scss";
import Product from "../Product/Product";

const Products = ({ products }) => {
  const RenderProducts = products?.map((product) => (
    <Product
      title={product.title}
      description={product.description}
      category={product.category}
      price={product.price}
      image={product.image}
      key={product._id}
    />
  ));

  return <div className={styles.Products}>{RenderProducts}</div>;
};

export default Products;
