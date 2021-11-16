import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import MessageDisplayer from "../MessageDisplayer/MessageDisplayer";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <Fragment>
      <div className={styles.body}>
        <Header />
        <div className={styles.mainSite}>{props.children}</div>
        <Footer />
      </div>
      <MessageDisplayer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default Layout;
