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
};

export type LoginViewType = {
  isLoginView: boolean;
  loginViewHandler: () => void;
};
export type ManageRoadMapProps = {
 handleGetStartedBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
