import { useSelector } from "react-redux";
import classes from './OrderSummary.module.css';

const OrderSummary = () => {  
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.bag);

  let quantity = <p>{totalQuantity} Items:</p>;
  if(totalQuantity <= 1) {
    quantity = <p>{totalQuantity} Item:</p>;
  }

  return (
    <section className={classes.summary}>
        <h2>Order Summary</h2>
        <p>Total <span className={classes.total}>AU${totalAmount.toFixed(2)}</span></p>
        {quantity}
        <ul>
          {items.map((item) => ( 
            <li key={item.id}>
              <span>{item.name} ({item.quantity})</span><span>{item.size}</span>
            </li>
          ))}
        </ul>
      </section>
  )
}

export default OrderSummary;
