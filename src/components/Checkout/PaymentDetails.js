import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { RegionDropdown } from "react-country-region-selector";
import { apiInstance } from "../../firebase/config";
import { ordersActions } from "../../redux/orders/orders-slice";
import { saveNewOrder } from "../../redux/orders/orders-actions";
import { uiActions } from "../../redux/ui/ui-slice";
import LoadingDots from "../UI/LoadingDots";
import Button from "../UI/forms/Button";
import Input from "../UI/forms/Input";
import classes from "./PaymentDetails.module.css";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "AU",
};

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const [error, setError] = useState(null);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [isChecked, setIsChecked] = useState(false);

  const { items, totalAmount } = useSelector((state) => state.bag);
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleCheck = (e) => {
    setIsChecked((prevState) => !prevState);

    if (e.target.value) {
      setNameOnCard(recipientName);
      setBillingAddress({
        ...shippingAddress,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    dispatch(uiActions.setIsLoading(true));
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !recipientName ||
      !nameOnCard
    ) {
      setError("Please complete all non-optional fields.");
      return;
    }

    try {
      const { data: clientSecret } = await apiInstance.post(
        "/payments/create",
        {
          amount: totalAmount * 100,
          shipping: {
            name: recipientName,
            address: {
              ...shippingAddress,
            },
          },
        }
      );

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: nameOnCard,
          address: {
            ...billingAddress,
          },
        },
      });

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      const configOrder = {
        orderTotal: totalAmount,
        orderItems: items,
      };

      dispatch(saveNewOrder(configOrder));
      dispatch(uiActions.setIsLoading(false));
      dispatch(ordersActions.setSuccess(true));
    } catch {
      setError(
        "Something went wrong. Please check your details and try again."
      );
    }
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <form className={classes.paymentDetails} onSubmit={submitHandler}>
      <div className={classes.group}>
        <h2>Shipping Address</h2>
        <Input
          id="name"
          label="Full Name"
          type="text"
          onChange={(e) => setRecipientName(e.target.value)}
          name="recipientName"
          value={recipientName}
          required
        />

        <Input
          id="line1"
          label="Line 1"
          type="text"
          onChange={(e) => handleShipping(e)}
          name="line1"
          value={shippingAddress.line1}
          required
        />

        <Input
          id="line2"
          label="Line 2 (Optional)"
          type="text"
          onChange={(e) => handleShipping(e)}
          name="line2"
          value={shippingAddress.line2}
        />

        <Input
          id="city"
          label="City"
          type="text"
          onChange={(e) => handleShipping(e)}
          name="city"
          value={shippingAddress.city}
          required
        />

        <div className={classes.innerGroup}>
          <div className={classes.control}>
            <label htmlFor="state">State:</label>
            <RegionDropdown
              id="state"
              defaultOptionLabel=""
              labelType="short"
              country="Australia"
              value={shippingAddress.state}
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "state",
                    value: val,
                  },
                })
              }
            />
          </div>

          <Input
            id="postal_code"
            label="Postal Code"
            type="text"
            onChange={(e) => handleShipping(e)}
            name="postal_code"
            value={shippingAddress.postal_code}
            required
          />
        </div>
      </div>

      <div className={classes.group}>
        <h2>Billing Address</h2>

        <input
          id="checkBilling"
          label="Same as Shipping Address"
          type="checkbox"
          name="checkBilling"
          value={isChecked}
          onChange={handleCheck}
        />
        <label htmlFor="checkBilling">Same as Shipping Address</label>

        <Input
          id="nameOnCard"
          label="Name on Card"
          type="text"
          onChange={(e) => setNameOnCard(e.target.value)}
          name="nameOnCard"
          value={nameOnCard}
          required
        />

        <Input
          id="line1"
          label="Line 1"
          type="text"
          onChange={(e) => handleBilling(e)}
          name="line1"
          value={billingAddress.line1}
          required
        />

        <Input
          id="line2"
          label="Line 2 (Optional)"
          type="text"
          onChange={(e) => handleBilling(e)}
          name="line2"
          value={billingAddress.line2}
        />

        <Input
          id="city"
          label="City"
          type="text"
          onChange={(e) => handleBilling(e)}
          name="city"
          value={billingAddress.city}
          required
        />

        <div className={classes.innerGroup}>
          <div className={classes.control}>
            <label htmlFor="state">State:</label>
            <RegionDropdown
              id="state"
              defaultOptionLabel=""
              labelType="short"
              country="Australia"
              value={billingAddress.state}
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "state",
                    value: val,
                  },
                })
              }
            />
          </div>

          <Input
            id="postal_code"
            label="Postal Code"
            type="text"
            onChange={(e) => handleBilling(e)}
            name="postal_code"
            value={billingAddress.postal_code}
            required
          />
        </div>
      </div>

      <div className={classes.cardGroup}>
        <h2>Card Details</h2>
        <p>Type '42' until completing all card fields to test.</p>
        <CardElement options={configCardElement} />
      </div>
      {error && <p className={classes.error}>{error}</p>}
      <Button>{isLoading ? <LoadingDots /> : "Place Order"}</Button>
    </form>
  );
};

export default PaymentDetails;
