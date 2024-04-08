import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  user: Object | null,
  isLoading: Boolean
}

const initialState = {
  user: {userName: ""},
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
      state.user = {userName: ""};
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {loginUser, logoutUser, setLoading} = userSlice.actions;
