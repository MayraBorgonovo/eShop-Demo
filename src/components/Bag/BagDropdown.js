import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import DropdownWrapper from "../UI/DropdownWrapper";
import Button from "../UI/forms/Button";
import BagItem from "./BagItem";
import classes from "./BagDropdown.module.css";

const BagDropdown = () => {
  const history = useHistory();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.bag
  );

  useEffect(() => {
    if (totalQuantity.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalQuantity]);

  const iconStyle = {
    margin: "1rem auto",
    display: "block",
    fontSize: "1.5rem",
  };

  let content = (
    <div className={classes.empty}>
      <BsBag style={iconStyle} />
      <h2>Your Shopping Bag is Empty</h2>
    </div>
  );

  if (totalQuantity > 0) {
    content = (
      <div>
        <h2>Your Shopping Bag</h2>
        <ul>
          {items.map((item) => (
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
        <div className={classes.actions}>
          <span>Total: AU${totalAmount.toFixed(2)}</span>
          <div>
            <Button onClick={() => history.push("/cart")}>
              View Bag
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DropdownWrapper
      path="/cart"
      className={classes.bagMenu}
      btnClass={btnIsHighlighted ? classes.bump : ""}
      icon={
        <>
          <BsBag style={{ fontSize: "1.9rem", verticalAlign: "middle" }} />
          <span className={classes.badge}>{totalQuantity}</span>
        </>
      }
    >
      {content}
    </DropdownWrapper>
  );
};

export default BagDropdown;
