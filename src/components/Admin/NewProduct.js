import { useDispatch } from "react-redux";
import { addNewProduct } from "../../redux/products/products-actions";
import { uiActions } from "../../redux/ui/ui-slice";
import useInput, { isEmpty, validatePrice } from "../../hooks/use-input";
import Input from "../UI/forms/Input";
import Button from "../UI/forms/Button";
import Modal from "../UI/Modal";
import classes from "./NewProduct.module.css";

const NewProduct = () => {
  const dispatch = useDispatch();

  const {
    value: enteredCategory,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangedHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInput(isEmpty);

  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(isEmpty);

  const {
    value: enteredPrice,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
  } = useInput(validatePrice);

  const {
    value: enteredColour,
    isValid: colourIsValid,
    hasError: colourHasError,
    valueChangeHandler: colourChangedHandler,
    inputBlurHandler: colourBlurHandler,
  } = useInput(isEmpty);

  const {
    value: enteredImage,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangedHandler,
    inputBlurHandler: imageBlurHandler,
  } = useInput(isEmpty);

  const {
    value: enteredDescription,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isEmpty);

  let formIsValid = false;
  if (
    categoryIsValid &&
    titleIsValid &&
    priceIsValid &&
    colourIsValid &&
    imageIsValid &&
    descriptionIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const product = {
      category: enteredCategory,
      title: enteredTitle,
      price: +enteredPrice,
      image: [enteredImage],
      description: enteredDescription,
    };

    dispatch(addNewProduct(product));
    dispatch(uiActions.hideModal());
  };

  return (
    <Modal>
      <form className={classes.productForm} onSubmit={submitHandler}>
        <h2>Add New Product</h2>

        <div className={classes.control}>
          <label htmlFor="category">Category:</label>
          <select
            className={categoryHasError ? classes.invalid : ""}
            id="category"
            onChange={categoryChangedHandler}
            onBlur={categoryBlurHandler}
            defaultValue=""
          >
            <option></option>
            <option>women</option>
            <option>men</option>
          </select>
          {categoryHasError && <p>Please enter a category.</p>}
          <Input
            id="title"
            label="Title"
            type="text"
            isValid={titleHasError}
            onChange={titleChangedHandler}
            onBlur={titleBlurHandler}
            value={enteredTitle}
            required
          />
          {titleHasError && <p>Please enter a valid title.</p>}
          <Input
            id="price"
            label="Price"
            type="number"
            step="0.1"
            isValid={priceHasError}
            onChange={priceChangedHandler}
            onBlur={priceBlurHandler}
            value={enteredPrice}
            required
          />
          {priceHasError && <p>Please enter a valid price.</p>}
          <Input
            id="colour"
            label="Colour"
            type="text"
            isValid={colourHasError}
            onChange={colourChangedHandler}
            onBlur={colourBlurHandler}
            value={enteredColour}
            required
          />
          {colourHasError && <p>Please enter a valid price.</p>}
          <Input
            id="image"
            label="Image Name"
            type="text"
            isValid={imageHasError}
            onChange={imageChangedHandler}
            onBlur={imageBlurHandler}
            value={enteredImage}
            required
          />
          {imageHasError && <p>Please enter an image name.</p>}
          <textarea
            className={descriptionHasError ? classes.invalid : ""}
            aria-label="Description"
            value={enteredDescription}
            onChange={descriptionChangedHandler}
            onBlur={descriptionBlurHandler}
            placeholder="Description"
            rows="5"
            required
          ></textarea>
          {descriptionHasError && <p>Please enter a description.</p>}
        </div>

        <div className={classes.actions}>
          <Button
            className={classes.clear}
            type="button"
            onClick={() => dispatch(uiActions.hideModal())}
          >
            Cancel
          </Button>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewProduct;
