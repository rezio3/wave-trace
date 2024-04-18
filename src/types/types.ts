import { store } from "../app/store";

export type AppDispatch = typeof store.dispatch;

export type UserReturnState = {
  data: {
    user: InitialState;
  };
};

export type UserDetails = {
  uid?: string;
  userName: string | null;
  email?: string | null;
};

export type InitialState = {
  user: UserDetails;
  isLoading: Boolean;
};

export const initialState: InitialState = {
  user: { userName: "" },
  isLoading: true,
};
