import { Fragment } from "react";

import ProductsManager from "../../components/products/ProductsManager/ProductsManager";
import { ALL_PRODUCTS } from "../../constants/products";

function AllProductsViewer() {
  return (
    <Fragment>
      <ProductsManager category={ALL_PRODUCTS}></ProductsManager>
    </Fragment>
  );
}

export default AllProductsViewer;
