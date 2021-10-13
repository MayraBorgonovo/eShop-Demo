import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/orders/orders-actions";
import OrderHighlight from "../../components/Checkout/OrderHighlight";
import { ordersActions } from "../../redux/orders/orders-slice";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(getOrder(orderId));

    return() => {
      dispatch(ordersActions.setOrder({}))
    }
  }, [dispatch, orderId]);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && !error && <OrderHighlight />}
    </>
  );
};

export default OrderDetail;