import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modalIsVisible: false,
    mobileIsVisible: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleMobile(state) {
      state.mobileIsVisible = !state.mobileIsVisible;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    showModal(state) {
      state.modalIsVisible = true;
    },
    hideModal(state) {
      state.modalIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
