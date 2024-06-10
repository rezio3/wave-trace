import Alert from "@mui/material/Alert";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";

const StatusAlert = (props: {
  status: string;
  setOpenProceedDialog?: (value: boolean) => void;
}) => {
  const [anchorElDate, setAnchorElDate] = useState<HTMLElement | null>(null);
  const handlePopoverDateOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDate(event.currentTarget);
  };
  const handlePopoverDateClose = () => {
    setAnchorElDate(null);
  };
  const openDate = Boolean(anchorElDate);

  const openProceedDialog = () => {
    if (props.setOpenProceedDialog) {
      props.setOpenProceedDialog(true);
    }
  };

  if (props.status === "inProgress") {
    return (
      <>
        <TableCell
          align="left"
          onMouseEnter={handlePopoverDateOpen}
          onMouseLeave={handlePopoverDateClose}
        >
          <Alert variant="outlined" severity="info" className="dashboard-alert">
            In progress...
          </Alert>
        </TableCell>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={openDate}
          anchorEl={anchorElDate}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: 10,
            horizontal: "right",
          }}
          onClose={handlePopoverDateClose}
          disableRestoreFocus
          PaperProps={{
            style: { maxWidth: "500px" },
          }}
        >
          <Typography
            sx={{ p: 3 }}
            variant="body2"
            className="pop-over-typography"
          >
            Your composition will be ready within 24 hours of placing the order.
            Editing capability for the description will be disabled after 2
            hours.
          </Typography>
        </Popover>
      </>
    );
  } else if (props.status === "completed") {
    return (
      <TableCell align="left">
        <Alert
          variant="outlined"
          severity="success"
          className="dashboard-alert green-dashboard-alert"
          onClick={openProceedDialog}
        >
          Done, click to proceed
        </Alert>
      </TableCell>
    );
  }
  return null;
};

export default StatusAlert;
