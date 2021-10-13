import { Link, useRouteMatch } from 'react-router-dom';
import Image from '../UI/Image';
import classes from './ProductCard.module.css';

const ProductCard = ({ title, price, imgName, img2, id }) => {
  const match = useRouteMatch();

  return (
    <>
    <div key={id} className={classes.product}>
      <Link to={`${match.url}/${id}`}>
      <div className={classes.image}>
      <Image src={imgName} alt={title}/>
      <Image className={classes.after} src={img2} alt={title}/>
      </div>
      <div className={classes.details}>
        <h3>{title}</h3>
        <p>AU${price.toFixed(2)}</p>
      </div>
      </Link>
    </div>
    </>
  );
};

export default ProductCard;
