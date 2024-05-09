import { useState } from "react";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { app } from "../../firebase";
import { UserOrders } from "../../types";
import { useSelector } from "react-redux";
import { UserDetails, UserReturnState } from "../../types";
import UserDashboard from "./UserDashboard";
import "./dashboard.scss";
import CreateOrder from "./CreateOrder";
import UserNav from "./UserNav";

const UserPage = () => {
  const [page, setPage] = useState(0);

  const pages = [<UserDashboard />, <CreateOrder />];

  return (
    <div className="d-flex align-items-start justify-content-between w-100">
      <UserNav setPage={setPage} />
      {pages[page]}
      <div className="dashboard-spacer"></div>
    </div>
  );
};

export default UserPage;
