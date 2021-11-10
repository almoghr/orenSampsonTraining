import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import MessageDisplayer from "../MessageDisplayer/MessageDisplayer";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
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
