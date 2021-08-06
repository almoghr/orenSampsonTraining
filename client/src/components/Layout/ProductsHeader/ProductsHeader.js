import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { get_categories } from "../../../store/actions/categoriesActions";
import styles from "./ProductsHeader.module.scss";

function ProductsHeader() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.categoriesReducers.isLoading);
  const categories = useSelector(
    (state) => state.categoriesReducers.categories
  );

  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);

  let NavigationLinks = categories.map((category, index) => {
    const to = `/categories/${category}`;

    return (
      <li key={index}>
        <NavLink to={to}>{category}</NavLink>
      </li>
    );
  });

  NavigationLinks = !isLoading && NavigationLinks;

  return (
    <header>
      <ClipLoader loading={isLoading} size={150} />
      <nav>
        <ul className={styles.ProductsHeader}>{NavigationLinks}</ul>
      </nav>
    </header>
  );
}

export default ProductsHeader;
