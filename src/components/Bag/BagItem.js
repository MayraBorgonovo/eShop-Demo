import { useDispatch } from "react-redux";
import { bagActions } from "../../redux/bag/bag-slice";
import Image from "../UI/Image";
import classes from "./BagItem.module.css";

const BagItem = (props) => {
  const { title, quantity, total, price, id, image, size } = props.item;
  const dispatch = useDispatch();

  const removeItemHandler = () => {
    dispatch(bagActions.removeItemFromBag(id));
  };

  const addItemHandler = () => {
    dispatch(
      bagActions.addItemToBag({
        id,
        title,
        price,
        size,
        image,
      })
    );
  };

  return (
    <li className={classes.item}>
      <div className={classes.thumb}>
        <Image src={image} alt={title}/>
      </div>
      <div className={classes.Ctn}> 
      <header>
        <h3>{title}</h3>
        <div>
          <span className={classes.itemprice}>AU${price.toFixed(2)}</span>
          <span>{size}</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
        <div className={classes.total}>
          Subtotal<span > AU${total.toFixed(2)}</span>
        </div>
      </div>
      </div>
    </li>
  );
};

export default BagItem;
