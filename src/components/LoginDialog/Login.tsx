import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [loginInputs, setLoginInputs] = React.useState({
    email: "",
    password: "",
  });

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      email: e.target.value,
    });
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      password: e.target.value,
    });
  };
  const loginHandler = () => {
    signInWithEmailAndPassword(
      auth,
      loginInputs.email,
      loginInputs.password
    ).catch(() => {
      console.log("Invalid login data");
    });
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center h-100">
        <DialogTitle>Login</DialogTitle>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={emailHandler}
            value={loginInputs.email}
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
            onChange={passwordHandler}
            value={loginInputs.password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
        </Box>
        <Button
          variant="contained"
          onClick={loginHandler}
          className="mt-3 mb-4"
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
