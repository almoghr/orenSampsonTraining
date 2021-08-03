import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ProductsHeader.module.scss";

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
