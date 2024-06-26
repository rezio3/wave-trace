import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";

const initialState: InitialState = {
  user: { userName: "" },
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = { userName: "" };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
