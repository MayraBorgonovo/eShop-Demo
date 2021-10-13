import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { publishableKey } from "../stripe/config";
import PaymentSuccess from "../components/Checkout/PaymentSuccess";
import ReducedLayout from "../components/Layout/ReducedLayout";
import PaymentDetails from "../components/Checkout/PaymentDetails";
import OrderSummary from "../components/Checkout/OrderSummary";

const stripePromise = loadStripe(publishableKey);

const Payment = () => {
  const success = useSelector(state => state.orders.success);

  return (
    <Elements stripe={stripePromise}>
    <ReducedLayout>
      {!success && <PaymentDetails />}
      {!success && <OrderSummary />}
      {success && <PaymentSuccess />}
    </ReducedLayout>
    </Elements>
  );
};

export default Payment;
