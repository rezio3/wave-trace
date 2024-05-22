import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./createOrder.scss";
import { useState } from "react";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { UserReturnState, UserDetails } from "../../types";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import ButtonLoading from "../ButtonLoading";
import { Alert } from "@mui/material";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    title: "",
    description: "",
    orderId: uuidv4(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      alert("Something went wrong. Try again.");
      setIsLoading(false);
    }
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
          <div className="d-flex align-items-end mt-4">
            <Button
              variant="contained"
              className="font-weight-bold button-and-alert-height"
              onClick={sendRequestButtonHandler}
            >
              Send request
              {isLoading ? <ButtonLoading /> : null}
            </Button>
            {success ? (
              <Alert
                variant="outlined"
                severity="success"
                className="ms-4 button-and-alert-height success-alert"
              >
                Order placed successfully!
              </Alert>
            ) : null}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateOrder;
