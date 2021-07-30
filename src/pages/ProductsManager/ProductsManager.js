import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../../store/reducers/thunkActions/products-slice";
// import { getProducts } from "../../store/reducers/sagaActions/products-slice";

import Products from "../../components/products/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

function ProductsManager() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsSlice.products);
  const paginatedProducts = useSelector(
    (state) => state.paginationSlice.paginatedArr
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Products products={paginatedProducts} />
      <Pagination completeArray={products} />
    </div>
  );
}

export default ProductsManager;
