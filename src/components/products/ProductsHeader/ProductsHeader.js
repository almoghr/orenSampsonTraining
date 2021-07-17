import { useState, useEffect } from "react";
import axios from "axios";

function ProductsHeader() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChangedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const getCategories = async () => {
    let categoriesArr;
    try {
      categoriesArr = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      categoriesArr = categoriesArr.data;
      setCategories(categoriesArr);
      if (categoriesArr.length) {
        setSelectedCategory(categoriesArr[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const renderCategories = categories.map((category, index) => (
    <option value={category} key={index}>
      {category}
    </option>
  ));

  return (
    <div>
      <select value={selectedCategory} onChange={handleChangedCategory}>
        {renderCategories}
      </select>
    </div>
  );
}

export default ProductsHeader;
