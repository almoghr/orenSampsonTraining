import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./SideBar.module.scss";

function SideBar(props) {
  const showSideBar = useSelector((state) => state.generalReducers.showSideBar);

  return (
    showSideBar && (
      <nav className={styles["sidebar"]}>
        <ul className={styles["sidebar__items"]}>
          <li>
            <NavLink className={styles["sidebar__item"]} to="/auth">
              Sigup\Login
            </NavLink>
          </li>
          <li>
            <NavLink className={styles["sidebar__item"]} to="/cart">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink className={styles["sidebar__item"]} to="/transactions">
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  );
}

export default SideBar;
