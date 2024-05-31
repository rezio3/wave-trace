import { useState } from "react";
import UserDashboard from "./UserDashboard";
import "./dashboard.scss";
import CreateOrderForm from "./CreateOrderForm";
import UserNav from "./UserNav";
import "./userPage.scss";
import DeletedOrders from "./DeletedOrders";

const UserPage = () => {
  const [page, setPage] = useState(0);

  const pages = [<UserDashboard setPage={setPage}/>, <CreateOrderForm />, <DeletedOrders />];

  return (
    <div className="w-100 user-page-container">
      <UserNav setPage={setPage} />
      {pages[page]}
    </div>
  );
};

export default UserPage;
