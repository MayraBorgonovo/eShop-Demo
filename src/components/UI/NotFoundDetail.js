import classes from "./NotFoundDetail.module.css";
import { Link } from "react-router-dom";

const NotFoundDetail = () => {
  return (
    <main className={classes.main}>
      <div className={classes.content}>
        <h1>Sorry!</h1>
        <p>We can't seem to find the page that you are looking for.</p>
        <Link to='/'>Go Back Home</Link>
      </div>
    </main>
  );
};

export default NotFoundDetail;
