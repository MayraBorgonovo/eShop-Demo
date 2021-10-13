import { Link } from "react-router-dom";
import classes from "./DropdownWrapper.module.css";

const DropdownWrapper = ({icon, className, btnClass, path, children}) => {

  return (
    <li>
      <Link to={path} className={`${classes.navBtn} ${btnClass}`}>
        {icon}
      </Link>
      <button className={`${classes.navBtn} ${btnClass}`}>
        {icon}
      </button>
      <div className={`${classes.dropdown} ${className}`}>
        <div className={classes.arrowUp}></div>
        {children}
      </div>
    </li>
  );
};

export default DropdownWrapper;
