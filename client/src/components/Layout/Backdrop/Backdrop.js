import { useSelector } from "react-redux";

import styles from "./Backdrop.module.scss";

const Backdrop = () => {
  const showBackDrop = useSelector(
    (state) => state.generalReducers.showBackDrop
  );

  return showBackDrop && <div className={styles["Backdrop"]}></div>;
};

export default Backdrop;
