import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../reducers/userSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});
