import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductsHeader() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const categoriesArr = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );

      setCategories(categoriesArr.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const NavigationLinks = categories.map((category, index) => (
    <li key={index}>
      <NavLink to="">{category}</NavLink>
    </li>
  ));

  return (
    <header>
      <nav>{NavigationLinks}</nav>
    </header>
  );
}

export default ProductsHeader;
