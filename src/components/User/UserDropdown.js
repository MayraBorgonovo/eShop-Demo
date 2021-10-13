import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { logout } from "../../redux/auth/auth-actions";
import DropdownWrapper from "../UI/DropdownWrapper";
import classes from "./UserDropdown.module.css";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <DropdownWrapper
      path='/dashboard/user-profile'
      className={classes.userMenu}
      icon={<AiOutlineUser style={{ fontSize: "2rem", verticalAlign: 'middle' }} />}
    >
      <ul>
        {!user && (
          <li className={classes.login}>
            <Link to="/auth">Login / Register</Link>
          </li>
        )}
        {user && (
          <li className={classes.user}>
            <span>{user.email}</span>
          </li>
        )}
        <li>
          <Link to="/dashboard/user-profile">
            My Account
          </Link>
        </li>
        {user && <li className={classes.logout}>
          <span onClick={logoutHandler}>Logout</span>
        </li>}
      </ul>
    </DropdownWrapper>
  );
};

export default UserDropdown;
