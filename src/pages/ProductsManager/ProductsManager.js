import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPaginatedProducts } from "../../store/reducers/products-slice";
import { getProducts } from "../../store/reducers/sagaActions/products-slice";
import ProductsHeader from "../../components/products/ProductsHeader/ProductsHeader";
import Products from "../../components/products/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

function ProductsManager() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsSlice.products);
  const paginatedProducts = useSelector(
    (state) => state.productsSlice.paginatedProducts
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <ProductsHeader />
      <Products products={paginatedProducts} />
      <Pagination
        completeArray={products}
        setPaginatedArrFunc={setPaginatedProducts}
      />
    </div>
  );
}

export default ProductsManager;
