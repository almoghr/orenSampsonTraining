import styles from "./Products.module.scss";
import Product from "../Product/Product";

const Products = ({ products }) => {
  const RenderProducts = products?.map((product) => (
    <Product
      id={product.id}
      title={product.title}
      description={product.description}
      category={product.category}
      price={product.price}
      amount={product.amount}
      image={product.image}
      key={product.id}
    />
  ));

  return <div className={styles.Products}>{RenderProducts}</div>;
};

export default Products;
