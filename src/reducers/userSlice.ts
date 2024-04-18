import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../types";

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {userName: ""};
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  
});

export const {loginUser, logoutUser, setLoading} = userSlice.actions;
