import { useState } from "react";
import BasicList from "./UserDashboard";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { app } from "../../firebase";
import { UserOrders } from "../../types";
import { useSelector } from "react-redux";
import { UserDetails, UserReturnState } from "../../types";

const UserPage = () => {
  const [input, setInput] = useState("");
  const [orders, setOrders] = useState<UserOrders[]>([]);

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
    <>
      <BasicList />
      <input type="text" value={input} onChange={inputHandler} />
      <button onClick={placeOrderHandler}>Place na order</button>
      <button onClick={showOrderHandler}>Show orders</button>
      <div>
        {orders.length > 0
          ? orders.map((e) => {
              return <p>{e.userOrder}</p>;
            })
          : null}
      </div>
    </>
  );
};

export default UserPage;
