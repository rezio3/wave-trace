import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginViewType } from "../../types";
import ChangeDialogWindowBtn from "./ChangeDialogWindowBtn";

const SignUp: React.FC<loginViewType> = (props) => {
  const [newAccountInputs, setNewAccountInputs] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isAlert, setIsAlert] = React.useState(false);

  const newUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccountInputs({
      ...newAccountInputs,
      userName: e.target.value,
    });
  };

  const newEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccountInputs({
      ...newAccountInputs,
      email: e.target.value,
    });
  };
  const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlert(false);
    setNewAccountInputs({
      ...newAccountInputs,
      password: e.target.value,
    });
  };
  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlert(false);
    setNewAccountInputs({
      ...newAccountInputs,
      confirmPassword: e.target.value,
    });
  };
  const registerHandler = () => {
    const {password, confirmPassword} = newAccountInputs;
    if(password !== confirmPassword) {
      setIsAlert(true);
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      newAccountInputs.email,
      newAccountInputs.password
    );
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
          />
          </Box>
          {!isAlert ? null : <span className="alert-notification">Passwords do not match</span>}
          
        <Button
          variant="contained"
          onClick={registerHandler}
          className="mt-3 mb-4"
        >
          Register
        </Button>
        <ChangeDialogWindowBtn loginViewHandler={props.loginViewHandler} isLoginView={props.isLoginView}/>
      </div>
    </>
  );
};

export default SignUp;
