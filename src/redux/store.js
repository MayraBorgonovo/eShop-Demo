import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./auth/auth-slice";
import uiReducer from "./ui/ui-slice";
import bagReducer from "./bag/bag-slice";
import productsReducer from "./products/products-slice";
import ordersReducer from "./orders/orders-slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  bag: bagReducer,
  products: productsReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bag"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
