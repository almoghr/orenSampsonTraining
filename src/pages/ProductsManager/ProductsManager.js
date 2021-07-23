import { useState, useEffect } from "react";
import axios from "axios";

import ProductsHeader from "../../components/products/ProductsHeader/ProductsHeader";
import Products from "../../components/products/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

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

  const Paginate = !products ? (
    ""
  ) : (
    <Pagination products={products} setSlicedFunc={setSlicedProducts} />
  );

  return (
    <div>
      <ProductsHeader />
      <Products products={slicedProducts} />
      {Paginate}
    </div>
  );
}

export default ProductsManager;
