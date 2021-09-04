import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { get_products } from "../../../store/actions/productsActions";
import Products from "../Products/Products";
import Pagination from "../../Pagination/Pagination";

function ProductsManager(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.productsReducers.isLoading);
  const products = useSelector((state) => state.productsReducers.products);
  const paginatedProducts = useSelector(
    (state) => state.paginationReducers.paginatedArr
  );

  useEffect(() => {
    dispatch(get_products(props.category));
  }, [dispatch, props]);

  return (
    <div>
      <ClipLoader loading={isLoading} size={150} />
      <Products products={paginatedProducts} />
      <Pagination completeArray={products} />
    </div>
  );
}

export default ProductsManager;
