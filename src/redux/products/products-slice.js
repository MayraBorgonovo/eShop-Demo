import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: {},
  },
  reducers: {
    addProduct(state, action) {
      state.products = action.payload;
    },
    setSingleProduct(state, action) {
      state.singleProduct = action.payload;
    }
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
