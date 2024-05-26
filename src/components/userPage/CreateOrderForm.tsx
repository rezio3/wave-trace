import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./createOrder.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserReturnState, UserDetails } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ButtonLoading from "../ButtonLoading";
import { Alert } from "@mui/material";
import { createOrder } from "./ordersManagement/createOrder";

const CreateOrderForm = () => {
  const [order, setOrder] = useState({
    title: "",
    description: "",
    orderId: uuidv4(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    createOrder(
      setIsLoading,
      setSuccess,
      setError,
      order,
      setOrder,
      currentUser
    );
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
        <h4 className="mb-4">Place an order</h4>
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
            {error ? (
              <Alert
                variant="outlined"
                severity="error"
                className="ms-4 button-and-alert-height succes-alert"
              >
                Fields cannot be empty!
              </Alert>
            ) : null}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateOrderForm;
