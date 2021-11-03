import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import Products from "../Products/Products";
import Pagination from "../../Pagination/Pagination";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import styles from "./ProductsManager.module.scss";

function ProductsManager() {
  const isLoading = useSelector(
    (state) => state.loadingAndErrorReducers.isLoading
  );

  const products = useSelector((state) => state.productsReducers.products);

  return (
    <div className={styles["ProductsManager"]}>
      <ProductsHeader />
      <ClipLoader loading={isLoading} size={150} />
      <Products products={products} />
      <Pagination completeArray={products} />
    </div>
  );
}

export default ProductsManager;
