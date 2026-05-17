import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null
};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    setUser: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
    }

  }
});

export const {
  setUser,
  logoutUser
} = authSlice.actions;

export default authSlice.reducer;