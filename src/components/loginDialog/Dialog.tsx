import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails, UserReturnState } from "../../types";
import { logoutUser } from "../../reducers/userSlice";
import Login from "./Login";
import SignUp from "./SignUp";
import { NavbarProps } from "../../types";
import "./Dialog.scss";
import { NavLink } from "react-router-dom";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const [loginView, setLoginView] = React.useState(true);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChangeLoginWindow = () => {
    setLoginView(!loginView);
  };

  return (
    <Dialog onClose={handleClose} open={open} className="dialog-parent">
      <div className="d-flex align-items-center justify-content-center p-4 dialog-window">
        {loginView ? (
          <Login
            loginViewHandler={handleChangeLoginWindow}
            isLoginView={loginView}
          />
        ) : (
          <SignUp
            loginViewHandler={handleChangeLoginWindow}
            isLoginView={loginView}
          />
        )}
      </div>
    </Dialog>
  );
}

export default function SimpleDialogDemo(props: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const user = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const userEmail = user.email;
  const getUserName = () => {
    if (userEmail) {
      return userEmail.split("@")[0];
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    setOpen(false);
  }, [user.email]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
    if (props.setLandingPageSection) {
      props.setLandingPageSection(0);
    }
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div className="d-flex justify-content-end align-items-center">
      {getUserName() ? (
        <span className="me-3 welcome-nav-text text-secondary">
          Logged in as {getUserName()}
        </span>
      ) : null}

      {user.email ? (
        <NavLink to="/">
          <Button variant="outlined" onClick={handleLogout} className="log-btn">
            Logout
          </Button>
        </NavLink>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          className="log-btn"
        >
          Login / Sign Up
        </Button>
      )}

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
