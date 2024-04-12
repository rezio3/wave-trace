import { createSlice } from "@reduxjs/toolkit";

export type UserReturnState = {
  data: {
    user: InitialState;
  }
}

export type UserDetails = {
  uid?: string
  userName: string | null
  email?: string | null
}

export type InitialState = {
  user: UserDetails
  isLoading: Boolean
}

const initialState: InitialState = {
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