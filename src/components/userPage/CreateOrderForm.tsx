import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./createOrder.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserReturnState, UserDetails, Order } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ButtonLoading from "../ButtonLoading";
import { Alert } from "@mui/material";
import { createOrder } from "./ordersManagement/createOrder";
import { checkOrderLimit } from "./ordersManagement/checkOrderLimit";

const CreateOrderForm = () => {
  const [order, setOrder] = useState({
    title: "",
    description: "",
    orderId: uuidv4(),
    createdDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLimit, setIsLimit] = useState(false);

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
    checkOrderLimit(currentUser, setIsLimit);
    if (!isLimit) {
      createOrder(
        setIsLoading,
        setSuccess,
        setError,
        order,
        setOrder,
        currentUser
      );
    }
  };

  useEffect(() => {
    checkOrderLimit(currentUser, setIsLimit);
  }, []);
  return (
    <div className="container">
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
        <form className="w-100 d-flex flex-column align-items-start">
          <div className="w-100 d-flex align-items-center">
            <TextField
              id="outlined-basic"
              label="Order name / Title"
              variant="outlined"
              onChange={titleInputHandler}
              value={order.title}
            />
            <ArrowLeftIcon className="ms-4 arrow-icon" />
            <p className="mb-0">Example: "Music for a fight scene"</p>
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
              A detailed description of the music you need. You can describe the
              scene, character, mood, emotions, instruments to be used,
              electronic ambiences, reverberation, etc.{" "}
              <u>
                Remember that the more precisely you describe what you need, the
                more accurately your piece will be composed.
              </u>
              <br />
              If you're inspired by other music or want something similar to an
              existing one,{" "}
              <u>please add a link from Spotify, YouTube, SoundCloud</u>, or any
              other platform so that we can also take it into consideration.
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
                className="ms-4 button-and-alert-height success-alert"
              >
                Fields cannot be empty!
              </Alert>
            ) : null}
            {isLimit ? (
              <Alert
                variant="outlined"
                severity="info"
                className="ms-4 button-and-alert-height success-alert"
              >
                You have reached the limit of 3 orders per day. Please come back
                tomorrow.
              </Alert>
            ) : null}
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CreateOrderForm;
