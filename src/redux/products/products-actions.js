import { uiActions } from "../ui/ui-slice";
import { productsActions } from "./products-slice";
import {
  collection,
  getDocs,
  getDoc,
  where,
  doc,
  query,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const fetchProducts = (filterType) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));

    const products = [];
    const productsRef = collection(db, "products");
    
    let querySnapshot;
    try {
      if(filterType) {
        const q = query(productsRef, where("category", "==", filterType));
        querySnapshot = await getDocs(q);
      } else {
        querySnapshot = await getDocs(productsRef);
      }
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      dispatch(productsActions.addProduct(products));
    } catch (e) {
      dispatch(uiActions.setError('Something went wrong! Please contact the administrator.'));
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setIsLoading(true));
    
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      const product = docSnap.data();

      dispatch(productsActions.setSingleProduct({
        ...product
      }));
    } catch (e) {
      dispatch(uiActions.setError('Something went wrong! Please contact the administrator.'));
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setSuccess(false));

    try {
      await deleteDoc(doc(db, "products", productId));

      dispatch(uiActions.setSuccess('Product deleted successfully. Refresh the screen to see the updated list.'));
    } catch (e) {
      dispatch(uiActions.setError('Something went wrong! Please contact the administrator.'));
    }
  };
};

export const addNewProduct = (product) => {
  return async (dispatch) => {
    dispatch(uiActions.setError(null));
    dispatch(uiActions.setSuccess(false));

    try {
      await addDoc(collection(db, "products"), {
        category: product.category,
        title: product.title,
        description: product.description,
        imgName: product.image,
        price: product.price
      });
      dispatch(uiActions.setSuccess('Success! Please refresh the screen to see the updated list.'));
    } catch (error) {
      dispatch(uiActions.setError('Something went wrong! Please contact the administrator.'));
    }
  };
};
