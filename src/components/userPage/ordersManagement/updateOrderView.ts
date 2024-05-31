import { UserDetails, Order } from "../../../types";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

export const updateOrdersView = async (
  setLoading: (value: boolean) => void,
  setOrders: (value: Order[]) => void,
  currentUser: UserDetails,
  page: string
) => {
  setLoading(true);

  const querySnapshot = await getDocs(
    collection(db, `orders_${currentUser.email}`)
  ).catch(() => {
    return;
  });
  let orderList: Order[] = [];

  if (querySnapshot) {
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const singularOrder = doc.data() as Order;
        let pageCondition;
        if (page === "dashboard") {
          pageCondition = !singularOrder.deleted;
        } else if (page === "deletedOrders") {
          pageCondition = singularOrder.deleted;
        }
        if (pageCondition) {
          console.log(singularOrder)
          orderList.push(singularOrder);
        }
        setOrders(orderList);
        setLoading(false);
      });
    } else {
      setOrders([]);
      setLoading(false);
    }
  }
  setLoading(false);
};
