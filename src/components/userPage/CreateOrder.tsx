import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./createOrder.scss";
import { useState } from "react";
import { getDatabase, push, ref, set, get } from "firebase/database";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { UserReturnState, UserDetails } from "../../types";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    title: "",
    description: "",
  });

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      title: e.target.value,
    });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      description: e.target.value,
    });
  };

  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );

  const sendRequestButtonHandler = async () => {
    const db = getFirestore(app);
    console.log(currentUser);
    try {
      const docRef = await addDoc(
        collection(db, `orders_${currentUser.email}`),
        {
          // userId: currentUser.uid,
          // userEmail: currentUser.email,
          title: order.title,
          description: order.description,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // const db = getDatabase(app);
    // const newDocRef = push(ref(db, `${currentUser.uid}/orders`));
    // set(newDocRef, {
    //   title: order.title,
    //   description: order.description,
    // })
    //   .then(() => {
    //     alert("Order placed successfully");
    //   })
    //   .catch((error) => {
    //     alert("error" + error);
    //   });
    // setOrder({
    //   title: "",
    //   description: "",
    // });
  };

  return (
    <div className="container create-order-container">
      <Box
        sx={{
          width: "100%",
          height: "80%",
          marginTop: "10px",
          bgcolor: "divider",
        }}
        className="p-5 d-flex flex-column align-items-start my-0"
      >
        <h4>Place an order</h4>
        <div className="w-100 d-flex flex-column align-items-start">
          <div className="w-100 d-flex align-items-center">
            <TextField
              id="outlined-basic"
              label="Order name / Title"
              variant="outlined"
              onChange={titleInputHandler}
              value={order.title}
            />
            <ArrowLeftIcon className="ms-4 arrow-icon" />
            <p className="mb-0">Przykład: "Muzyka do musicalu".</p>
          </div>
          <div className="mt-4 w-100 d-flex align-items-center">
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={8}
              onChange={descriptionInputHandler}
              value={order.description}
              className="w-50"
            />
            <ArrowLeftIcon className="ms-4 arrow-icon" />
            <p className="w-25 mb-0">
              Opis tego co potrzebujesz. Może być to ogólny skrócony zarys
              sceny, postaci, fabuły. Przykład: "habababa baba baa ba
              abbbababaaa hababbahahabab ab ab abbababbabab haba ".
            </p>
          </div>
          <Button
            variant="contained"
            className="mt-4 font-weight-bold"
            onClick={sendRequestButtonHandler}
          >
            Send request
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CreateOrder;
