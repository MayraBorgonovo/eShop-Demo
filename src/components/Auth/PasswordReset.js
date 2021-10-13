import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../redux/auth/auth-actions";
import useInput, { validateEmail} from "../../hooks/use-input";
import Input from "../UI/forms/Input";
import LoadingDots from "../UI/LoadingDots";
import Button from "../UI/forms/Button";
import classes from "./PasswordReset.module.css";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.ui.error);
  const isLoading = useSelector(state => state.ui.isLoading);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  async function submitHandler(e) {
    e.preventDefault();

    if (!emailIsValid) {
      return;
    }

    dispatch(resetPassword(enteredEmail));
  }

  return (
    <form onSubmit={submitHandler}>
        <h2>Password Reset</h2>
        <div className={classes.control}>
        <Input
            id="email"
            label="Email"
            type="email"
            isValid={emailHasError}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            required
          />
          {emailHasError && <p>Please enter a valid email.</p>}
          {error && <p className={classes.error}>{error}</p>}
        </div>

        <div className={classes.actions}>
          <Button type="submit">
            {isLoading ? <LoadingDots /> : <span>Reset Password</span>}
          </Button>
          <Link to="/auth">Login</Link>
        </div>
      </form>
  );
};

export default PasswordReset;
