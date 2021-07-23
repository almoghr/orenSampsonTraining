import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../../store/products-slice/products-actions";
import { productsActions } from "../../store/products-slice/products-slice";
import ProductsHeader from "../../components/products/ProductsHeader/ProductsHeader";
import Products from "../../components/products/Products/Products";
import Pagination from "../../components/Pagination/Pagination";

function ProductsManager() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsSlice.products);
  const slicedProducts = useSelector(
    (state) => state.productsSlice.slicedProducts
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <ProductsHeader />
      <Products products={slicedProducts} />
      <Pagination
        products={products}
        setSlicedFunc={productsActions.setSlicedProdcuts}
      />
    </div>
  );
}

export default ProductsManager;
