import { useParams } from "react-router-dom";

import ProductsManager from "../../components/products/ProductsManager/ProductsManager";

const CategoryProductsViewer = () => {
  const params = useParams();

  return (
    <div>
      <ProductsManager category={params.category}></ProductsManager>
    </div>
  );
};

export default CategoryProductsViewer;
