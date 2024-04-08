import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  const [loginInputs, setLoginInputs] = React.useState({
    email: "",
    password: "",
  });

  // const [loginInputs, setLoginInputs] = React.useState({
  //   email: "",
  //   password: "",
  // });

  // const newFullNameHandler = () => {};
  // const newUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewAccountInputs({
  //     ...newAccountInputs,
  //     userName: e.target.value,
  //   });
  // };

  // const newEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewAccountInputs({
  //     ...newAccountInputs,
  //     email: e.target.value,
  //   });
  // };
  // const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewAccountInputs({
  //     ...newAccountInputs,
  //     password: e.target.value,
  //   });
  // };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      email: e.target.value
    })
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      password: e.target.value
    })
  };

  const loginHandler = () => {
signInWithEmailAndPassword(auth,loginInputs.email,loginInputs.password)
  };
  // const registerHandler = () => {
  //   createUserWithEmailAndPassword(
  //     auth,
  //     newAccountInputs.email,
  //     newAccountInputs.password
  //   )
  //     .then(() =>
  //       signInWithEmailAndPassword(
  //         auth,
  //         newAccountInputs.email,
  //         newAccountInputs.password
  //       )
  //     )
  //     .then(() => {
  //       if (auth.currentUser !== null) {
  //         updateProfile(auth.currentUser, {
  //           displayName: newAccountInputs.userName,
  //         });
  //       } else {
  //         console.error("Brak bieżącego użytkownika");
  //       }
  //     });
  // };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <input
        onChange={emailHandler}
        type="email"
        id="email"
        placeholder="Email"
        value={loginInputs.email}
      ></input>
      <input
        onChange={passwordHandler}
        type="password"
        id="password"
        placeholder="New Password"
        value={loginInputs.password}
      ></input>
      <button onClick={loginHandler}>Login</button>
      {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List> */}
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
          Login
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
