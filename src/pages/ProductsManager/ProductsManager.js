// import { useEffect } from "react";
import { useSelector } from "react-redux";

import ProductsHeader from "../../components/products/ProductsHeader/ProductsHeader";
import Products from "../../components/products/Products/Products";
// import Pagination from "../../components/Pagination/Pagination";

function ProductsManager() {
  // const products = useSelector((state) => state.productsSlice.products);
  const slicedProducts = useSelector(
    (state) => state.productsSlice.slicedProducts
  );

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <div>
      <ProductsHeader />
      <Products products={slicedProducts} />
      {/* <Pagination
        products={products}
        setSlicedFunc={productsActions.setSlicedProdcuts}
      /> */}
    </div>
  );
}

export default ProductsManager;
