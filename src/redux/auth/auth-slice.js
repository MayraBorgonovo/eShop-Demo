import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    success: false,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
