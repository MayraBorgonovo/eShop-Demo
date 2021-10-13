import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import useInput, {isEmpty, validateEmail, validatePassword} from "../../hooks/use-input";
import { loginWithGoogle, loginWithEmail, signupWithEmail} from "../../redux/auth/auth-actions";
import { FcGoogle } from "react-icons/fc";
import Button from "../UI/forms/Button";
import LoadingDots from "../UI/LoadingDots";
import Input from "../UI/forms/Input";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [isLogin, setIsLogin] = useState(true);

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: enteredSurname,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangedHandler,
    inputBlurHandler: surnameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (isLogin) {
    if (emailIsValid && passwordIsValid) {
      formIsValid = true;
    }
  } else {
    if (nameIsValid && surnameIsValid && emailIsValid && passwordIsValid) {
      formIsValid = true;
    }
  }

  const googleLoginHandler = () => {
    dispatch(loginWithGoogle());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    if (isLogin) {
      dispatch(loginWithEmail(enteredEmail, enteredPassword));
    } else {
      dispatch(
        signupWithEmail(
          enteredName,
          enteredSurname,
          enteredEmail,
          enteredPassword
        )
      );
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

        <div className={classes.control}>
          {!isLogin && (
            <Input
              id="name"
              label="First Name"
              type="text"
              isValid={nameHasError}
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
          )}
          {nameHasError && <p>Please enter your first name.</p>}
          {!isLogin && (
            <Input
              id="surname"
              label="Surname"
              type="text"
              isValid={surnameHasError}
              onChange={surnameChangedHandler}
              onBlur={surnameBlurHandler}
              value={enteredSurname}
            />
          )}
          {surnameHasError && <p>Please enter your surname.</p>}
          <Input
            id="email"
            label="Email"
            type="email"
            isValid={emailHasError}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailHasError && <p>Please enter a valid email.</p>}
          <Input
            id="password"
            label="Password"
            type="password"
            isValid={passwordHasError}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordHasError && (
            <p>The pasword should have at leat eight (8) characters.</p>
          )}
          {error && <p>{error}</p>}
        </div>

        <div className={classes.actions}>
          <Button type="submit">
            {isLoading ? (
              <LoadingDots />
            ) : (
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
            )}
          </Button>
          <Link to="/recovery">Forgot Password?</Link>
        </div>

        {isLogin && (
          <div className={classes.socialLogin}>
            <h3>Or sign in with...</h3>
            <Button type="button" onClick={googleLoginHandler}>
              <FcGoogle style={{ marginTop: "1px" }} /> Google
            </Button>
          </div>
        )}
      </form>

      <div className={classes.toggle}>
        <p>
          {isLogin ? "Need an account?" : "Already have an account?"}
          <span type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </>
  );
};

export default AuthForm;
