import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as generalActions from "../../../store/general/actions";
import { GENERAL_INITIAL_STATE } from "../../../store/general/reducers";
import styles from "./SideBar.module.scss";

function SideBar(props) {
  const dispatch = useDispatch();
  const showSideBar = useSelector((state) => state.generalReducers.showSideBar);

  const closeShowSideBarHandler = () => {
    dispatch(
      generalActions.general_showSideBar_setter(
        GENERAL_INITIAL_STATE.showSideBar
      )
    );
    dispatch(
      generalActions.general_showBackDrop_setter(
        GENERAL_INITIAL_STATE.showBackDrop
      )
    );
  };

  return (
    showSideBar && (
      <nav className={styles["sidebar"]}>
        <ul className={styles["sidebar__items"]}>
          <li>
            <NavLink
              className={styles["sidebar__item"]}
              to="/auth"
              onClick={closeShowSideBarHandler}
            >
              Sigup\Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles["sidebar__item"]}
              to="/cart"
              onClick={closeShowSideBarHandler}
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles["sidebar__item"]}
              to="/transactions"
              onClick={closeShowSideBarHandler}
            >
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  );
}

export default SideBar;
