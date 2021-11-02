import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { get_products } from "../../../store/products/actions";
import Products from "../Products/Products";
import Pagination from "../../Pagination/Pagination";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import styles from "./ProductsManager.module.scss";

function ProductsManager(props) {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state.loadingAndErrorReducers.isLoading
  );

  const products = useSelector((state) => state.productsReducers.products);

  const paginatedProducts = useSelector(
    (state) => state.paginationReducers.paginatedArr
  );

  useEffect(() => {
    if (!products?.length) {
      dispatch(get_products(props.category));
    }
  }, [dispatch, props.category, products]);

  return (
    <div className={styles["ProductsManager"]}>
      <ProductsHeader />
      <ClipLoader loading={isLoading} size={150} />
      <Products products={paginatedProducts} />
      <Pagination completeArray={products} />
    </div>
  );
}

export default ProductsManager;
