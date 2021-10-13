import classes from './AuthWrapper.module.css';

const AuthWrapper = props => {
  return (
    <section className={classes.auth}>{props.children}</section>
  )
};

export default AuthWrapper;