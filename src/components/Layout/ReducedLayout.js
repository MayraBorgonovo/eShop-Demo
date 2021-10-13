import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

import classes from "./ReducedLayout.module.css";

const ReducedLayout = (props) => {
  const history = useHistory();
  const location = useLocation();

  const isCheckout = location.pathname.includes("checkout");

  const backHandler = () => {
    if (location.pathname.includes("dashboard")) {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  return (
    <>
      <header className={classes.header}>
        <div className="logo" style={{marginLeft: '0'}}>
          <Link to="/">LOGO</Link>
        </div>

        {!isCheckout && (
          <div>
            <button className={classes.backLink} onClick={backHandler}>
              Continue Shopping &#187;
            </button>
          </div>
        )}
        {isCheckout && <div className={classes.checkout}>Checkout</div>}
      </header>
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default ReducedLayout;
