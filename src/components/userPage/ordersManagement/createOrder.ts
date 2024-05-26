import { OrderForm, UserDetails } from "../../../types";
import { app } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (
  setIsLoading: (value: boolean) => void,
  setSuccess: (value: boolean) => void,
  setError: (value: boolean) => void,
  order: OrderForm,
  setOrder: (value: OrderForm) => void,
  currentUser: UserDetails
) => {
  if (order.title === "" || order.description === "") {
    setError(true);
    return;
  }
  setError(false);
  const db = getFirestore(app);
  setIsLoading(true);
  try {
    await setDoc(doc(db, `orders_${currentUser.email}`, order.orderId), {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      title: order.title,
      description: order.description,
      orderId: order.orderId,
    });

    setOrder({
      orderId: uuidv4(),
      title: "",
      description: "",
    });
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Something went wrong. Please try again.");
    setIsLoading(false);
  }
};
