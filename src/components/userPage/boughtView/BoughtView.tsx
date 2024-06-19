import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";
import "./boughtView.scss";

const BoughtView = (props: { setBoughtView: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/dashboard");
    props.setBoughtView(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={true}
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
        <div className="bought-window">
          <DialogTitle className="mb-2">DONE</DialogTitle>
          <DialogContent>
            <DialogContentText className="mb-4">
              You've purchased your music!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>"Proceed to download"</Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default BoughtView;
