import classes from "./Button.module.css";

const Button = ({ children, className, ...otherProps }) => {
  return (
    <button className={`${classes.btn} ${className}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
