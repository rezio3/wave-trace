import { useState } from "react";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { app } from "../../firebase";
import { UserOrders } from "../../types";
import { useSelector } from "react-redux";
import { UserDetails, UserReturnState } from "../../types";
import UserDashboard from "./UserDashboard";
import "./dashboard.scss";
import CreateOrderForm from "./CreateOrderForm";
import UserNav from "./UserNav";
import "./userPage.scss";

const UserPage = () => {
  const [page, setPage] = useState(0);

  const pages = [<UserDashboard />, <CreateOrderForm />];

  return (
    <div className="w-100 user-page-container">
      <UserNav setPage={setPage} />
      {pages[page]}
    </div>
  );
};

export default UserPage;
