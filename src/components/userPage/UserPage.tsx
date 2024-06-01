import { useState } from "react";
import UserDashboard from "./UserDashboard";
import "./dashboard.scss";
import CreateOrderForm from "./CreateOrderForm";
import UserNav from "./UserNav";
import "./userPage.scss";
import DeletedOrders from "./DeletedOrders";
import FaqPage from "../faq/FaqPage";
import Support from "../support/Support";
import { useSelector } from "react-redux";
import { UserReturnState, UserDetails } from "../../types";

const UserPage = () => {
  const [page, setPage] = useState(0);
  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const pages = [
    <UserDashboard setPage={setPage} />,
    <CreateOrderForm />,
    <DeletedOrders />,
    <FaqPage isUserLoggedIn={true} />,
    <Support isUserLoggedIn={true} user={currentUser} />,
  ];

  return (
    <div className="w-100 user-page-container">
      <UserNav setPage={setPage} />
      {pages[page]}
    </div>
  );
};

export default UserPage;
