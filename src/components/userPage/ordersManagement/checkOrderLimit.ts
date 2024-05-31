import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Order, UserDetails } from "../../../types";
import { app } from "../../../firebase";

export const checkOrderLimit = async (
  currentUser: UserDetails,
  setIsLimit: (value: boolean) => void
) => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(
    collection(db, `orders_${currentUser.email}`)
  ).catch(() => {
    return;
  });
  let orderList: Order[] = [];
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      orderList.push(doc.data() as Order);
    });
  }
  const today = new Date();
  const formattedToday = today
    .toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");
  const parseDate = (dateTimeString: string): string => {
    const [datePart] = dateTimeString.split(", ");
    const [day, month, year] = datePart.split(".");
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");

    return `${formattedDay}.${formattedMonth}.${year}`;
  };
  const todayCount = orderList.filter(
    (item) => parseDate(item.createdDate) === formattedToday
  ).length;
  const halo = orderList.filter(
    (item) => parseDate(item.createdDate) === formattedToday
  ).length;
  setIsLimit(todayCount >= 3);
};
