import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { loginViewType } from "../../types";
import ChangeDialogWindowBtn from "./ChangeDialogWindowBtn";



const Login:React.FC<loginViewType> = (props) => {
  const [loginInputs, setLoginInputs] = React.useState({
    email: "",
    password: "",
  });
  const [isAlert, setIsAlert] = React.useState(false);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlert(false);
    setLoginInputs({
      ...loginInputs,
      email: e.target.value,
    });
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlert(false);
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
      setIsAlert(true);
      console.log("Invalid login data");
    });
  };

  const enterKey: React.KeyboardEventHandler<HTMLDivElement> = (event)=>{
    if(event.key === "Enter") {
      event.preventDefault();
      loginHandler();
    }
  }

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
            onChange={passwordHandler}
            value={loginInputs.password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onKeyDown={enterKey}
          />
        </Box>
        {!isAlert ? null : <span className="alert-notification">Incorrect email or password</span>}
        <Button
          variant="contained"
          onClick={loginHandler}
          className="mt-3 mb-4"
        >
          Login
        </Button>
        <ChangeDialogWindowBtn loginViewHandler={props.loginViewHandler} isLoginView={props.isLoginView}/>
        
      </div>
    </>
  );
};

export default Login;
