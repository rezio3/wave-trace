import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails, UserReturnState, logoutUser } from "../../slicesRedux/userSlice";
import Login from "./Login";
import SignUp from "./SignUp";
import "./Dialog.scss";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth={"md"}
      className="dialog-parent"
    >
      <div className="d-flex align-items-center justify-content-center p-4 dialog-window">
        <Login />
        <div className="h-75 border-end mx-5"></div>
        <SignUp />
      </div>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const user = useSelector<UserReturnState, UserDetails>((state) => state.data.user.user);
  return (
    <div className="d-flex justify-content-end">
      {user.userName ? (
        <Button variant="outlined" onClick={handleLogout} className="log-btn">
          Logout
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen} className="log-btn">
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
