import { useDispatch, useSelector } from "react-redux";
import useInput, {isEmpty, validateEmail} from "../../hooks/use-input";
import Button from "../UI/forms/Button";
import LoadingDots from "../UI/LoadingDots";
import Input from "../UI/forms/Input";
import classes from "./UserProfile.module.css";
import { updateUserDetails } from "../../redux/auth/auth-actions";


const UserProfile = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const success = useSelector((state) => state.auth.success);
  const {id, first, last, email} = useSelector((state) => state.auth.currentUser);

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

  let formIsValid = false;
  if (nameIsValid || surnameIsValid || emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    const newName = enteredName ? enteredName : first;
    const newSurname = enteredSurname ? enteredSurname : last;
    const newEmail = enteredEmail ? enteredEmail : email;

    dispatch(updateUserDetails(JSON.stringify({
      id,
      first: newName,
      last: newSurname,
      email: newEmail
    })));
  };

  return (
    <form className={classes.userForm} onSubmit={submitHandler}>
    <div className={classes.control}>
        <Input
          id="name"
          label="First Name"
          type="text"
          isValid={nameHasError}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          defaultValue={first}
          required
        />
      {nameHasError && <p>Please enter your first name.</p>}
        <Input
          id="surname"
          label="Surname"
          type="text"
          isValid={surnameHasError}
          onChange={surnameChangedHandler}
          onBlur={surnameBlurHandler}
          defaultValue={last}
          required
        />
      {surnameHasError && <p>Please enter your surname.</p>}
      <Input
        id="email"
        label="Email"
        type="email"
        isValid={emailHasError}
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        defaultValue={email}
        required
      />
      {emailHasError && <p>Please enter a valid email.</p>}
      {error && <p>{error}</p>}
    </div>

    <div className={classes.actions}>
      <Button disabled={!formIsValid} type="submit">
        {!isLoading && !success && <span>Save Changes</span>}
        {isLoading && <LoadingDots />}
        {!isLoading && success && <span>Saved!</span>}
      </Button>
    </div>
  </form>
  );
};

export default UserProfile;

