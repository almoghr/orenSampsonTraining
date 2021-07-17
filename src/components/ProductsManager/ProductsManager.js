import { useState, useEffect } from "react";
import axios from "axios";

import Products from "../Products/Products";
import Pagination from "../Pagination/Pagination";

function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [slicedProducts, setSlicedProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Products products={slicedProducts} />
      <Pagination props={{ products, setSlicedProducts }} />
    </div>
  );
}

export default ProductsManager;
