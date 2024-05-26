import { UserDetails, Order } from "../../../types";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

export const updateOrdersView = async (
  setLoading: (value: boolean) => void,
  setOrders: (value: Order[]) => void,
  currentUser: UserDetails
) => {
  setLoading(true);
  console.log(currentUser);

  const querySnapshot = await getDocs(
    collection(db, `orders_${currentUser.email}`)
  ).catch(() => {
    return;
  });
  let tempArr: Order[] = [];
  if (querySnapshot) {
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data() as Order);
        setOrders(tempArr);
        setLoading(false);
      });
    } else {
      setOrders([]);
      setLoading(false);
    }
  }
  setLoading(false);
};
