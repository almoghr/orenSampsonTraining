import { NavLink } from "react-router-dom";
// import { MdStore } from "react-icons/md";
// import { AiOutlineShoppingCart } from "react-icons/ai";

// import SearchBar from "./SearchBar/SearchBar";
// import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Sigup\Login</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
    // <div className={styles.Header}>
    //   <MdStore />
    //   <SearchBar />
    //   <AiOutlineShoppingCart className={styles.AiOutlineShoppingCart} />
    // </div>
  );
};

export default Header;
