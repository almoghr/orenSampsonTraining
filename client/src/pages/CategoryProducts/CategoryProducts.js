import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const params = useParams();

  return (
    <div>
      <h1>{params.category}</h1>
    </div>
  );
};

export default CategoryProducts;
