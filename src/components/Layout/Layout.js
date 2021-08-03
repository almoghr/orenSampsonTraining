import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ProductsHeader from "./ProductsHeader/ProductsHeader";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <ProductsHeader />
      {props.children}
      <Footer />
      <ToastContainer />
    </Fragment>
  );
};

export default Layout;
