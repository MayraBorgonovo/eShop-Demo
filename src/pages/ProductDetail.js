import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/products/products-actions";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ProductHighlight from "../components/Shop/ProductHighlight";
import { productsActions } from "../redux/products/products-slice";


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.error);

  useEffect(() => {
    dispatch(getSingleProduct(productId));

    return() => {
      dispatch(productsActions.setSingleProduct({}))
    }
  }, [dispatch, productId]);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && !error && <ProductHighlight id={productId} />}
    </>
  );
};

export default ProductDetail;
