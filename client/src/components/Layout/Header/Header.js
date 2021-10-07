import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

import SideBar from "../SideBar/SideBar";
import Backdrop from "../Backdrop/Backdrop";
import * as generalActions from "../../../store/general/actions";
import { IoStorefrontOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const showSideBar = useSelector((state) => state.generalReducers.showSideBar);
  const showBackDrop = useSelector(
    (state) => state.generalReducers.showBackDrop
  );

  const switchShowSideBarHandler = () => {
    dispatch(generalActions.general_showSideBar_setter(!showSideBar));
    dispatch(generalActions.general_showBackDrop_setter(!showBackDrop));
  };

  const closeShowSideBarHandler = () => {
    dispatch(generalActions.general_showSideBar_setter(false));
    dispatch(generalActions.general_showBackDrop_setter(false));
  };

  return (
    <Fragment>
      <Backdrop />
      <OutsideClickHandler onOutsideClick={closeShowSideBarHandler}>
        <SideBar />
      </OutsideClickHandler>
      <header className={styles["main-header"]}>
        <div>
          <GiHamburgerMenu
            className={styles["main-header__burger"]}
            size={40}
            onClick={switchShowSideBarHandler}
          />
          <NavLink to="/">
            <IoStorefrontOutline
              className={styles["main-header__brand"]}
              size={40}
            />
          </NavLink>
        </div>
        <AiOutlineShoppingCart className={styles.AiOutlineShoppingCart} />
        <nav>
          <ul>
            <li>
              <NavLink to="/auth">Sigup\Login</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/transactions">Transactions</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
