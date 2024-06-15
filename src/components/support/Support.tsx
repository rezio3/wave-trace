import { TextField, Button, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import ButtonLoading from "../ButtonLoading";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { app } from "../../firebase";
import Alert from "@mui/material/Alert";
import { UserDetails } from "../../types";
import { NavLink } from "react-router-dom";

const Support = (props: { isUserLoggedIn: boolean; user?: UserDetails }) => {
  const [formInputs, setFormInputs] = useState({
    email: "",
    message: "",
  });
  useEffect(() => {
    if (props.user) {
      if (typeof props.user.email === "string") {
        setFormInputs({
          ...formInputs,
          email: props.user.email,
        });
      }
    }
  }, []);

  const [textAreaRows, setTextAreaRows] = useState(8);
  const [paddings, setPaddings] = useState(5);
  const is1700screen = useMediaQuery("(max-width: 1700px)");
  const is1400screen = useMediaQuery("(max-width: 1400px)");
  useEffect(() => {
    if (is1400screen) {
      setTextAreaRows(2);
      setPaddings(4);
    } else if (is1700screen) {
      setTextAreaRows(6);
      setPaddings(4);
    } else {
      setTextAreaRows(8);
      setPaddings(5);
    }
  }, [is1700screen, is1400screen]);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      email: e.target.value,
    });
  };
  const messageInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      message: e.target.value,
    });
  };
  const sendMessageButtonHandler = async () => {
    if (formInputs.email === "" || formInputs.message === "") {
      setError(true);
      return;
    }
    setError(false);
    setIsLoading(true);
    const db = getFirestore(app);
    try {
      await addDoc(collection(db, "mail"), {
        to: "jakub.rezler96@gmail.com",
        message: {
          subject: `WAVETRACE Support request from ${formInputs.email}`,
          html: formInputs.message,
        },
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    } catch (e) {
      console.error("Error sending message: ", e);
      alert("Something went wrong. Please try again.");
    }
    setFormInputs({
      email: "",
      message: "",
    });
    setIsLoading(false);
  };

  return (
    <div
      className={
        !props.isUserLoggedIn ? "container w-100 mt-5 p-0" : "container w-100"
      }
    >
      <div className={`p-${paddings} w-100 glass-container`}>
        {!props.isUserLoggedIn ? (
          <NavLink to="/">
            <Button variant="text" className="mb-4" name="back">
              <ArrowBackIosIcon />
              Back
            </Button>
          </NavLink>
        ) : null}

        <h4 className="pb-3">Support</h4>
        <form className="d-flex flex-column align-items-start">
          <TextField
            id="outlined-basic"
            label="Your email"
            variant="outlined"
            onChange={emailInputHandler}
            value={formInputs.email}
          />
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            multiline
            rows={textAreaRows}
            onChange={messageInputHandler}
            value={formInputs.message}
            className="w-50 mt-4"
            placeholder="How can we help you?"
          />
          <div className="d-flex align-items-end mt-4">
            <Button
              variant="contained"
              className="font-weight-bold button-and-alert-height"
              onClick={sendMessageButtonHandler}
            >
              Send message
              {isLoading ? <ButtonLoading /> : null}
            </Button>
            {success ? (
              <Alert
                variant="outlined"
                severity="success"
                className="ms-4 button-and-alert-height success-alert"
              >
                Message sent! We will try to respond as quickly as possible.
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Support;
