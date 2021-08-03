import { MdStore } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

import SearchBar from "./SearchBar/SearchBar";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.Header}>
      <MdStore />
      <SearchBar />
      <AiOutlineShoppingCart className={styles.AiOutlineShoppingCart} />
    </div>
  );
};

export default Header;
