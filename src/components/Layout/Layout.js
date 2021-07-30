import { Fragment } from "react";

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
    </Fragment>
  );
};

export default Layout;
