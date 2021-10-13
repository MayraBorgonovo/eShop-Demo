import { AiFillCheckCircle } from "react-icons/ai";
import classes from "./PaymentSuccess.module.css";

const PaymentSuccess = () => {
  return (
    <div className={classes.paymentSuccess}>
      <div>
        <h2>Order Placed</h2>
        <p>
          Your payment was successfully processed. You can close this tab now.
        </p>
      </div>
      <AiFillCheckCircle />
    </div>
  );
};

export default PaymentSuccess;
