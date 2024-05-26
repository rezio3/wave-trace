import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EditOrderProps } from "../../types";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { UserReturnState, UserDetails } from "../../types";

const EditOrderDialog: React.FC<EditOrderProps> = (props) => {
  const [editValue, setEditValue] = React.useState<string>();
  const db = getFirestore(app);
  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };
  const handleClose = () => {
    props.setOpenEditDialog(false);
  };
  const handleSave = async () => {
    const updatedOrder = {
      description: editValue,
    };
    await updateDoc(
      doc(db, `orders_${currentUser.email}`, props.orderId),
      updatedOrder
    );
    props.showOrderHandler();
  };
  React.useEffect(() => {
    setEditValue(props.description);
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={props.openEditDialog}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle className="mb-2">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            Change the description of your order. Remember that you can change
            the description within 2 hours of placing the order.
          </DialogContentText>
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            id="name"
            name="text"
            label="Description"
            type="textarea"
            fullWidth
            variant="standard"
            value={editValue}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditOrderDialog;
