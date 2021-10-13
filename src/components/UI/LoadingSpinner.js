import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.spinnerCtn}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
