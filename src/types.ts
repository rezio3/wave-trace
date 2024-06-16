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
  status: string;
  modifications: number;
  musicDemoName: string;
};
export type DashboardListItemProps = {
  deleteOrder: (orderId: string) => void;
  showOrderHandler: () => void;
  order: {
    title: string;
    description: string;
    status: string;
    createdDate: string;
    orderId: string;
    modifications: number;
    musicDemoName: string;
  };
};

export type Order = {
  userId: string;
  description: string;
  userEmail: string;
  title: string;
  orderId: string;
  createdDate: string;
  deleted: boolean;
  status: string;
  modifications: number;
  musicDemoName: string;
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

export type FooterProps = {
  setLandingPageSection?: (value: number) => void;
  isUserLoggedIn: boolean;
};

export type NavbarProps = {
  setLandingPageSection?: (value: number) => void;
};

export type PricesCalcState = {
  versionPrice: number;
  modOneMinVersion: number;
  extendedVersion: number;
  modExtendedVersion: number;
  totalPrice: number;
};
