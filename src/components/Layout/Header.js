import { Link, NavLink } from "react-router-dom";
import BagDropdown from "../Bag/BagDropdown";
import UserDropdown from "../User/UserDropdown";
import Burger from "../UI/Burger";
import MobileMenu from "./MobileMenu";
import classes from "./Header.module.css";

const Header = () => {

  return (
    <header className={classes.header}>
      <div className={classes.ctn}>
        <Burger />
        <MobileMenu />
        <div className='logo'>
          <Link to="/">LOGO</Link>
        </div>
        <div className={classes.search}>
          <NavLink activeClassName={classes.active} to="/products/women">Women</NavLink>
          <NavLink activeClassName={classes.active} to="/products/men">Men</NavLink>
        </div>
      </div>

      <nav>
        <ul className={classes.mainMenu}>
          <UserDropdown />
          <BagDropdown />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
