import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const bagSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToBag(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.totalAmount = state.totalAmount + newItem.price;
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          size: newItem.size,
          image: newItem.image,
          quantity: 1, 
          totalPrice: newItem.price,
          name: newItem.title,
        });

        toast.success("It's in your bag.");
      } else {
        state.totalAmount = state.totalAmount + existingItem.price;
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromBag(state, action) {
      const id = action.payload; //expect the id as the payload received
      const existingItem = state.items.find((i) => i.id === id);
      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    clearBag(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice.reducer;
