import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth/auth-actions";
import { IconContext } from "react-icons/lib";
import { AiOutlineUser } from "react-icons/ai";
import { FiBox } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import classes from "./SideNav.module.css";

const SideNav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  let isAdmin = false;
  if(currentUser) {
    isAdmin = currentUser.isAdmin;
  }

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.welcome}>
        <p>Hi,</p>
        <h2>{currentUser.first}</h2>
      </div>
      <IconContext.Provider value={{ className: classes.icons }}>
      <ul>
        <li>
         <Link to="/dashboard/user-profile"><AiOutlineUser /><span>My Details</span></Link>
        </li>
        <li>
          <Link to="/dashboard/orders"><FiBox /><span>My Orders</span></Link>
        </li>
        {isAdmin && <li>
          <Link to="/dashboard/admin"><GrUserAdmin /><span>My Admin</span></Link>
        </li>}
        <li className={classes.logout}>
          <BiLogOut /><span onClick={logoutHandler}>Logout</span>
        </li>
      </ul>
      </IconContext.Provider >
    </div>
  );
};
export default SideNav;
