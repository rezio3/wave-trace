import { store } from "./app/store";

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

export type UserOrders = {
  userOrder: string;
};

export type DashboardListItemType = {
  orderTitle: string;
  orderDescription: string;
  // orderPrice: string;
  // orderDate: string
  // orderStatus: string;
};