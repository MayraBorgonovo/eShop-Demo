import { uiActions } from "../../redux/ui/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Burger.module.css";

const Burger = () => {
  const dispatch = useDispatch();
  const mobileIsVisible = useSelector(state => state.ui.mobileIsVisible);

  return (
    <button className= {`${classes.burger} ${mobileIsVisible ? classes.visible : ''}`} onClick={() => dispatch(uiActions.toggleMobile())}>
      <div />
      <div />
      <div />
    </button>
  );
};

export default Burger;
