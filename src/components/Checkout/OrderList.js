import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from "../UI/forms/Button";
import classes from "./OrderList.module.css";

const OrderList = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const orderHistory = useSelector((state) => state.orders.orderHistory);

  let content = (
    <ul className={classes.orderList}>
      {(Array.isArray(orderHistory) && orderHistory.length > 0) && orderHistory.map((order) => (
        <li key={order.id}>
          <div className={classes.details}>
            <p><span>Order ID:</span> {order.id}</p>
            <p><span>Date:</span> {order.dateCreated}</p>
            <p><span>Order Total:</span> AU${order.orderTotal}</p>
          </div>
          <div className={classes.actions}>
          <Button onClick={() => history.push(`${match.url}/${order.id}`)}>View Order</Button>
          </div>
        </li>
      ))}
    </ul>
  );

  if (orderHistory.length < 1) {
    content = (
      <div>
        <p>You don't have any orders yet.</p>
      </div>
    );
  }

  return content;
};

export default OrderList;
