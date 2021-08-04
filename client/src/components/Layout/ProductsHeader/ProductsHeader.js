import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ProductsHeader.module.scss";

function ProductsHeader() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      let categoriesArr = await axios.get(
        "http://localhost:8080/api/categories/getcategories"
      );

      categoriesArr = categoriesArr.data.map((category) => category.category);

      setCategories(categoriesArr);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const NavigationLinks = categories.map((category, index) => {
    const to = `/categories/${category}`;

    return (
      <li style={{ display: "inline" }} key={index}>
        <NavLink to={to}>{category}</NavLink>
      </li>
    );
  });

  return (
    <header>
      <nav>
        <ul className={styles.ProductsHeader}>{NavigationLinks}</ul>
      </nav>
    </header>
  );
}

export default ProductsHeader;
