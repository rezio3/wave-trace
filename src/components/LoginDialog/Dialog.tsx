import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
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

  const handleListItemClick = (value: string) => {
    onClose(value);
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
        <div className="h-75 border mx-5"></div>
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
  const user = useSelector((state: any) => state.data.user);
  return (
    <div className="d-flex justify-content-end">
      {user.user.username ? (
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
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
