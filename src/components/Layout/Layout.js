import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        theme="colored"
        position="bottom-right"
      />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
