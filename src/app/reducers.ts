import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../slicesRedux/userSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});
