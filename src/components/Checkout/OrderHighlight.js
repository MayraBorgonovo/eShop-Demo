import { useSelector } from "react-redux";
import Image from "../UI/Image";
import classes from "./OrderHighlight.module.css";

const OrderHighlight = () => {
  const { id, orderItems, orderTotal, dateCreated } = useSelector(
    (state) => state.orders.order
  );

  return (
    <section className={classes.orderDetails}>
      <h2>Order Details</h2>
      <p>
        <span>Order ID:</span> {id}
      </p>
      <p>
        <span>Order Date:</span> {dateCreated}
      </p>
      <h3>Items:</h3>
      <ul className={classes.items}>
        {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((i) => (
          <li key={i.id}>
            <div className={classes.image}>
              <Image src={i.image} alt={i.name} />
            </div>
            <div className={classes.itemDetails}>
              <h4>{i.name}</h4>
              <p>{i.size}</p>
            </div>
          </li>
        ))}
      </ul>
      <h3>Order Total:</h3>
      <p>AU${orderTotal}</p>
    </section>
  );
};

export default OrderHighlight;
