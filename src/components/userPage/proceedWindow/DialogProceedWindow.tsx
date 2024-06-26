import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../firebase";
import FloatingActionButtonZoom from "./ProceedWindow";

type DialogProceedDialogProps = {
  openProceedDialog: boolean;
  setOpenProceedDialog: (value: boolean) => void;
  modifications: number;
  musicDemoName: string;
  orderId: string;
};

const DialogProceedWindow = (props: DialogProceedDialogProps) => {
  const db = getFirestore(app);

  const handleClose = () => {
    props.setOpenProceedDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.openProceedDialog}
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
        <FloatingActionButtonZoom
          modifications={props.modifications}
          musicDemoName={props.musicDemoName}
          orderId={props.orderId}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default DialogProceedWindow;
