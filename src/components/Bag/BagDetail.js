import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../UI/forms/Button";
import BagItem from "./BagItem";
import classes from "./BagDetail.module.css";

const BagDetail = () => {
  const history = useHistory();
  const {items, totalAmount, totalQuantity} = useSelector((state) => state.bag);

  let quantity = <p>{totalQuantity} Items</p>;
  if(totalQuantity <= 1) {
    quantity = <p>{totalQuantity} Item</p>;
  }

  let content = (
    <div className={classes.empty}>
      <h2>Your Shopping Bag is Empty</h2>
      <Button className={classes.backBtn} onClick={() => history.goBack()}>Continue Shopping</Button>
    </div>
  );

  if (totalQuantity > 0) {
    content = (
      <>
      <section className={classes.details}>
        <h2>My Bag</h2>
        <ul>
          {(Array.isArray(items) && items.length > 0) && items.map((item) => (
            <BagItem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                image: item.image,
                size: item.size,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
              }}
            />
          ))}
        </ul>
      </section>
      <section className={classes.actions}>
        <h2>Order Summary</h2>
        <p>Total <span>AU${totalAmount.toFixed(2)}</span></p>
        {quantity}
        <Button onClick={() => history.push('/cart/checkout')} >Checkout</Button>
      </section>
    </>
    );
  }

  return content;
};

export default BagDetail;
