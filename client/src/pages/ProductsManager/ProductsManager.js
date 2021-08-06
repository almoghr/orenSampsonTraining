import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import {
  get_products,
  products_reset_state,
} from "../../store/actions/productsActions";
import Products from "../../components/products/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

function ProductsManager() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.productsReducers.isLoading);
  const products = useSelector((state) => state.productsReducers.products);
  const paginatedProducts = useSelector(
    (state) => state.paginationReducers.paginatedArr
  );

  useEffect(() => {
    dispatch(get_products());

    return () => {
      dispatch(products_reset_state());
    };
  }, [dispatch]);

  return (
    <div>
      <ClipLoader loading={isLoading} size={150} />
      <Products products={paginatedProducts} />
      <Pagination completeArray={products} />
    </div>
  );
}

export default ProductsManager;
