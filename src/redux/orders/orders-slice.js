import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orderHistory: [],
    order: {},
    success: false,
    error: null
  },
  reducers: {
    setOrderHistory(state, action) {
      state.orderHistory = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
