import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui/ui-slice";
import { fetchProducts } from "../../redux/products/products-actions";
import NewProduct from "../../components/Admin/NewProduct";
import Button from "../../components/UI/forms/Button";
import ProductList from "../../components/Admin/ProductList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const AdminPage = () => {
  const dispatch = useDispatch();
  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.error);
  const success = useSelector(state => state.ui.success);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Products</h1>
      <Button
        style={{ width: "22rem", margin: ".5rem 0" }}
        onClick={() => dispatch(uiActions.showModal())}
      >
        Add New Product
      </Button>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && success && <p>{success}</p>}
      {!isLoading && <ProductList />}
      {modalIsVisible && <NewProduct />}
    </>
  );
};

export default AdminPage;
