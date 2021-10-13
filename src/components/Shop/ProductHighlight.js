import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../../redux/bag/bag-slice";
import ImageGallery from "../UI/ImageGallery";
import Button from "../UI/forms/Button";
import classes from "./ProductHighlight.module.css";

const ProductHighlight = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sizeValue, setSizeValue] = useState('');
  const [error, setError] = useState(null);
  const { title, price, description, imgName, colour } = useSelector(
    (state) => state.products.singleProduct
  );

  const addToBagHandler = (e) => {
    e.preventDefault();
    setError(null);

    if(sizeValue === '' || sizeValue === 'Please Select') {
      setError('Please select a size.');
      return;
    }

    dispatch(
      bagActions.addItemToBag({
        id: id + sizeValue,
        title,
        size: sizeValue,
        price,
        image: imgName[0],
      })
    );
  };


  const formClass = error ? classes.invalid : '';

  return (
    <div>
      <button className={classes.backLink} onClick={() => history.goBack()}>&#171; Go Back</button>
      <section className={classes.details}>
        <ImageGallery images={imgName} title={title} />
        <div className={classes.actions}>
          <h2>{title}</h2>
          <h3>AU${price}</h3>
          <p><span>Colour:</span> {colour}</p>
          <form className={formClass}>
            <label htmlFor="size">Size:</label>
            <select name="size" id="size" onChange={(e) => setSizeValue(e.target.value)} defaultValue='Please Select'>
              <option>Please Select</option>
              <option >AU 4</option>
              <option >AU 6</option>
              <option >AU 8</option>
              <option >AU 10</option>
              <option >AU 12</option>
            </select>
            {error && <p>{error}</p>}
          <Button onClick={addToBagHandler}>Add to Bag</Button>
          </form>
        </div>
      </section>
      <section className={classes.description}>
        <h2>Description</h2>
        <p>{description}</p>
      </section>
    </div>
  );
};

export default ProductHighlight;
