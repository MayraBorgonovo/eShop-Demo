import { uiActions } from "../ui/ui-slice";
import { bagActions } from "../bag/bag-slice";
import { ordersActions } from "./orders-slice";
import {
  collection,
  getDocs,
  getDoc,
  where,
  doc,
  query,
  addDoc,
  Timestamp
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";

export const getOrderHistory = () => {
   return async (dispatch) => {
    dispatch(ordersActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    const orders = [];
    const {uid} = auth.currentUser;
    const ordersRef = collection(db, "orders");

    try {
        const q = query(ordersRef, where("orderUserId", "==", uid));
        const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {dateCreated, orderItems, orderTotal} = doc.data();
        orders.push({
          id: doc.id,
          dateCreated: dateCreated.toDate().toDateString(),
          orderItems,
          orderTotal,
        });
      });
      dispatch(ordersActions.setOrderHistory(orders));
    } catch (e) {
      dispatch(ordersActions.setError("No orders found."));
    }
    dispatch(uiActions.setIsLoading(false));
   };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    dispatch(ordersActions.setError(null));
    dispatch(uiActions.setIsLoading(true));
    
    try {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      const order = await docSnap.data();

      dispatch(ordersActions.setOrder({
        id,
        dateCreated: order.dateCreated.toDate().toDateString(),
        orderItems: order.orderItems,
        orderTotal: order.orderTotal,
      }));
    } catch (e) {
      dispatch(ordersActions.setError('Something went wrong! Please contact the administrator.'));
    }
    dispatch(uiActions.setIsLoading(false));
    };
};

export const saveNewOrder = (order) => {
  return async (dispatch) => {
    dispatch(ordersActions.setError(null));
    const {uid} = auth.currentUser;

    try {
      await addDoc(collection(db, "orders"), {
        ...order,
        orderUserId: uid,
        dateCreated: Timestamp.fromDate(new Date()),
      });

      dispatch(bagActions.clearBag());
    } catch (error) {
      console.log(error.message)
      dispatch(ordersActions.setError('Something went wrong! Please contact the administrator.'));
    }
  };
};
