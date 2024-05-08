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
  const [input, setInput] = useState("");
  const [orders, setOrders] = useState<UserOrders[]>([]);
  const [page, setPage] = useState(0);

  const pages = [<UserDashboard />, <CreateOrder />];

  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const placeOrderHandler = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, `${currentUser.uid}/orders`));
    set(newDocRef, { userOrder: input })
      .then(() => {
        alert("Order placed successfully");
      })
      .catch((error) => {
        alert("error" + error);
      });
  };

  const showOrderHandler = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `${currentUser.uid}/orders`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setOrders(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  return (
    <div className="d-flex align-items-start justify-content-between w-100">
      <UserNav setPage={setPage} />

      {/* <input type="text" value={input} onChange={inputHandler} />
      <button onClick={placeOrderHandler}>Place an order</button>
      <button onClick={showOrderHandler}>Show orders</button>
      <div>
        {orders.length > 0
          ? orders.map((order) => {
              return <p>{order.userOrder}</p>;
            })
          : null}
      </div> */}
      {pages[page]}
      <div className="dashboard-spacer"></div>
    </div>
  );
};

export default UserPage;
