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
import Pricing from "../pricing/Pricing";
import { Routes, Route } from "react-router";

const UserPage = () => {
  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );

  return (
    <div className="w-100 user-page-container">
      <UserNav />
      <Routes>
        <Route path="/newOrder" element={<CreateOrderForm />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/trash" element={<DeletedOrders />} />
        <Route path="/pricing" element={<Pricing isUserLoggedIn />} />
        <Route path="/faq" element={<FaqPage isUserLoggedIn />} />
        <Route
          path="/support"
          element={<Support isUserLoggedIn user={currentUser} />}
        />
      </Routes>
    </div>
  );
};

export default UserPage;
