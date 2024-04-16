import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
  const [newAccountInputs, setNewAccountInputs] = React.useState({
    userName: "",
    email: "",
    password: "",
  });

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
    setNewAccountInputs({
      ...newAccountInputs,
      password: e.target.value,
    });
  };
  const registerHandler = () => {
    createUserWithEmailAndPassword(
      auth,
      newAccountInputs.email,
      newAccountInputs.password
    ).then(() => {
      if (auth.currentUser !== null) {
        updateProfile(auth.currentUser, {
          displayName: newAccountInputs.userName,
        });
        window.location.reload()
      } else {
        console.error("No current user.");
      }
    });
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
        <Button
          variant="contained"
          onClick={registerHandler}
          className="mt-3 mb-4"
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default SignUp;
