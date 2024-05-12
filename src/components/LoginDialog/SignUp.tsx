import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginViewType } from "../../types";
import ChangeDialogWindowBtn from "./ChangeDialogWindowBtn";
import { loginWithGoogleHandler } from "./loginWithGoogle";
import GoogleIcon from "@mui/icons-material/Google";

const SignUp: React.FC<LoginViewType> = (props) => {
  const [newAccountInputs, setNewAccountInputs] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordAlert, setIsPasswordAlert] = React.useState(false);
  const [isAlert, setIsAlert] = React.useState(false);

  const newUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlert(false);
    setNewAccountInputs({
      ...newAccountInputs,
      userName: e.target.value,
    });
  };

  const newEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlert(false);
    setNewAccountInputs({
      ...newAccountInputs,
      email: e.target.value,
    });
  };
  const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordAlert(false);
    setIsAlert(false);
    setNewAccountInputs({
      ...newAccountInputs,
      password: e.target.value,
    });
  };
  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordAlert(false);
    setIsAlert(false);
    setNewAccountInputs({
      ...newAccountInputs,
      confirmPassword: e.target.value,
    });
  };
  const registerHandler = () => {
    const { password, confirmPassword, userName, email } = newAccountInputs;
    if (
      (userName && email && password && confirmPassword) === "" ||
      !email.includes("@")
    ) {
      setIsAlert(true);
      return;
    } else if (password !== confirmPassword) {
      setIsPasswordAlert(true);
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      newAccountInputs.email,
      newAccountInputs.password
    ).catch(() => {});
  };

  const enterKey: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      registerHandler();
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center h-100">
        <DialogTitle>Create new account</DialogTitle>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={newUserNameHandler}
            value={newAccountInputs.userName}
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            type="text"
            onKeyDown={enterKey}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={newEmailHandler}
            value={newAccountInputs.email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            onKeyDown={enterKey}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={newPasswordHandler}
            value={newAccountInputs.password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onKeyDown={enterKey}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={confirmPasswordHandler}
            value={newAccountInputs.confirmPassword}
            id="outlined-basic"
            label="Confirm password"
            variant="outlined"
            type="password"
            onKeyDown={enterKey}
          />
        </Box>
        {!isAlert ? null : (
          <span className="alert-notification">Invalid data</span>
        )}
        {!isPasswordAlert ? null : (
          <span className="alert-notification">Passwords do not match</span>
        )}
        <Button
          variant="contained"
          onClick={registerHandler}
          className="mt-3 mb-4"
        >
          Register
        </Button>
        <Button variant="outlined" onClick={loginWithGoogleHandler}>
          <GoogleIcon className="me-2" />
          Login with Google
        </Button>
        <ChangeDialogWindowBtn
          loginViewHandler={props.loginViewHandler}
          isLoginView={props.isLoginView}
        />
      </div>
    </>
  );
};

export default SignUp;
