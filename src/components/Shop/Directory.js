import { Link } from 'react-router-dom';
import classes from "./Directory.module.css";
import ShopMen from "../../assets/front-men.jpg";
import ShopWomen from "../../assets/women-front-2.jpg";

const Directory = () => {
  return (
    <div className={classes.directory}>
        <div
          className={classes.item}
          style={{ backgroundImage: `url(${ShopWomen})` }}
        >
          <Link to="/products/women">
            Shop Women
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ backgroundImage: `url(${ShopMen})` }}
        >
          <Link to="/products/men">
            Shop Men
          </Link>
        </div>
    </div>
  );
};

export default Directory;
