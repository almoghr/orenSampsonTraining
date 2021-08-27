import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./ProductsHeader.module.scss";

function ProductsHeader() {
  const isLoading = useSelector((state) => state.categoriesReducers.isLoading);
  const categories = useSelector(
    (state) => state.categoriesReducers.categories
  );

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
