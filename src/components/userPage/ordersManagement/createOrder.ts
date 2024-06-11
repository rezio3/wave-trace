import { OrderForm, UserDetails } from "../../../types";
import { app } from "../../../firebase";
import { doc, setDoc, getFirestore, addDoc, collection } from "firebase/firestore";
import {  } from "firebase/firestore";
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
  const now = new Date();
  const dateOfOrder = now.toLocaleString();
  const db = getFirestore(app);
  setIsLoading(true);
  try {
    await setDoc(doc(db, `orders_${currentUser.email}`, order.orderId), {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      title: order.title,
      description: order.description,
      orderId: order.orderId,
      createdDate: dateOfOrder,
      deleted: false,
      status: "inProgress",
      modifications: 0,
    });
    await addDoc(collection(db, "mail"), {
      to: "jakub.rezler96@gmail.com",
      message: {
        subject: `WAVETRACE New Order from ${currentUser.email}`,
        html: `<b>Title:</b><br/>${order.title}<br /><b>Description:</b><br />${order.description}`,
      },
    });
    setOrder({
      orderId: uuidv4(),
      title: "",
      description: "",
      createdDate: "",
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
