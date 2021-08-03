import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { getProducts } from "../../store/actions/productsActions";
import Products from "../../components/products/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

function ProductsManager() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productsReducers.loading);
  const products = useSelector((state) => state.productsReducers.products);
  const paginatedProducts = useSelector(
    (state) => state.paginationReducers.paginatedArr
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <ClipLoader loading={loading} size={150} />
      <Products products={paginatedProducts} />
      <Pagination completeArray={products} />
    </div>
  );
}

export default ProductsManager;
