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
  title: string;
  description: string;
  orderId: string;
  createdDate: string;
};
export type DashboardListItemProps = {
  title: string;
  description: string;
  orderId: string;
  createdDate: string;
  deleteOrder: (orderId: string) => void;
  showOrderHandler: () => void;
};

export type DeletedListItemProps = {
  title: string;
  description: string;
  orderId: string;
  createdDate: string;
  restoreOrder: (orderId: string) => void;
  showOrderHandler: () => void;
};

export type LoginViewType = {
  isLoginView: boolean;
  loginViewHandler: () => void;
};
export type ManageRoadMapProps = {
  handleGetStartedBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type StepBoxProps = {
  number: string;
  header: string;
  txt: string;
};

export type Order = {
  userId: string;
  description: string;
  userEmail: string;
  title: string;
  orderId: string;
  createdDate: string;
  deleted: boolean;
};

export type EditOrderProps = {
  openEditDialog: boolean;
  setOpenEditDialog: (openEditDialog: boolean) => void;
  title: string;
  description: string;
  orderId: string;
  showOrderHandler: () => void;
  isEditable: boolean;
};

export type OrderForm = {
  title: string;
  description: string;
  orderId: string;
  createdDate: string;
};

export type UserNavProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
