import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
      <ToastContainer />
    </Fragment>
  );
};

export default Layout;
