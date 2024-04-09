import { createSlice } from "@reduxjs/toolkit";

export type UserReturnState = {
  data: {
    user: InitialState
  }
}

export type UserDetails = {
  uid?: string
  userName: string | null
  email?: string | null
};

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
    loginUser: (state, action: {
      payload: {
        uid: string 
        userName: string | null
        email: string | null
      }
    }) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = initialState.user;
    },
    setLoading: (state, action: {
      payload: Boolean
    }) => {
      state.isLoading = action.payload;
    },
  },
});

export const {loginUser, logoutUser, setLoading} = userSlice.actions;
