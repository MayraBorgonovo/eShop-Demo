import { useSelector } from "react-redux";
import { uiActions } from "../../redux/ui/ui-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./MobileMenu.module.css";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const mobileIsVisible = useSelector(state => state.ui.mobileIsVisible);

  return (
    <nav className={`${classes.mobile} ${mobileIsVisible ? classes.visible : ''}`} >
      <Link to='/products/women' onClick={() => dispatch(uiActions.toggleMobile())}>Women</Link>
      <Link to='/products/men' onClick={() => dispatch(uiActions.toggleMobile())}>Men</Link>
    </nav>
  );
};

export default MobileMenu;