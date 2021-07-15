import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import Product from "../Product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
