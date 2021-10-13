import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/orders/orders-actions";
import OrderList from "../../components/Checkout/OrderList";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.ui.isLoading);
  const error = useSelector(state => state.orders.error);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch])
  
  return (
    <>
      <h1>My Orders</h1>
      {isLoading && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {!isLoading && !error && <OrderList />}
    </>
  );
};

export default OrdersPage;