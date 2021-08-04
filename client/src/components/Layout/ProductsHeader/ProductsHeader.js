import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import { getCategories } from "../../../store/actions/categoriesActions";
import styles from "./ProductsHeader.module.scss";

function ProductsHeader() {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.categoriesReducers.loading);
  const categories = useSelector(
    (state) => state.categoriesReducers.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
