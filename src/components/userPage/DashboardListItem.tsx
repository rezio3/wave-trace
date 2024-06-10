import * as React from "react";
import { DashboardListItemProps } from "../../types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import EditOrderDialog from "./EditOrderDialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { checkTimeDifference } from "./ordersManagement/editCapability";
import "./dashboard.scss";
import StatusAlert from "./StatusAlert";
import DialogProceedWindow from "./proceedWindow/DialogProceedWindow";

const DashboardListItem: React.FC<DashboardListItemProps> = (props) => {
  const [anchorElTitle, setAnchorElTitle] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElDescription, setAnchorElDescription] =
    React.useState<HTMLElement | null>(null);

  const [isEditable, setIsEditable] = React.useState(true);

  const handlePopoverTitleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTitle(event.currentTarget);
  };

  const handlePopoverTitleClose = () => {
    setAnchorElTitle(null);
  };
  const handlePopoverDescriptionOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElDescription(event.currentTarget);
  };

  const handlePopoverDescriptionClose = () => {
    setAnchorElDescription(null);
  };

  const openTitle = Boolean(anchorElTitle);
  const openDescription = Boolean(anchorElDescription);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openProceedDialog, setOpenProceedDialog] = React.useState(false);
  const handleClickEdit = () => {
    checkTimeDifference(props.createdDate, setIsEditable);
    setOpenEditDialog(true);
  };

  const name = props.title.slice(0, 26) + "...";
  const description = props.description.slice(0, 26) + "...";
  const showStatusAlert = () => {
    if (!props.status) {
      return null;
    } else {
      return (
        <StatusAlert
          status={props.status}
          setOpenProceedDialog={setOpenProceedDialog}
        />
      );
    }
  };
  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        className="dashboard-order-item"
      >
        <TableCell
          component="th"
          scope="row"
          onMouseEnter={handlePopoverTitleOpen}
          onMouseLeave={handlePopoverTitleClose}
        >
          {props.title.length > 26 ? name : props.title}
        </TableCell>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={openTitle}
          anchorEl={anchorElTitle}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: 10,
            horizontal: "left",
          }}
          onClose={handlePopoverTitleClose}
          disableRestoreFocus
          PaperProps={{
            style: { maxWidth: "300px" },
          }}
        >
          <Typography sx={{ p: 3 }}>{props.title}</Typography>
        </Popover>

        <TableCell
          align="left"
          onMouseEnter={handlePopoverDescriptionOpen}
          onMouseLeave={handlePopoverDescriptionClose}
        >
          {props.description.length > 26 ? description : props.description}
        </TableCell>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={openDescription}
          anchorEl={anchorElDescription}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: 10,
            horizontal: "left",
          }}
          onClose={handlePopoverTitleClose}
          disableRestoreFocus
          PaperProps={{
            style: { maxWidth: "500px" },
          }}
        >
          <Typography sx={{ p: 3 }}>{props.description}</Typography>
        </Popover>
        <TableCell align="left">0.00$</TableCell>
        <TableCell align="left">{props.createdDate}</TableCell>
        {showStatusAlert()}

        <TableCell align="right">
          {props.status === "inProgress" ? (
            <Tooltip title="Edit">
              <Button variant="text" onClick={handleClickEdit}>
                <EditIcon className="text-white" />
              </Button>
            </Tooltip>
          ) : null}

          <Tooltip title="Delete">
            <Button
              variant="text"
              onClick={() => {
                props.deleteOrder(props.orderId);
              }}
            >
              <DeleteIcon className="text-white" />
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
      <EditOrderDialog
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        title={props.title}
        description={props.description}
        orderId={props.orderId}
        showOrderHandler={props.showOrderHandler}
        isEditable={isEditable}
      />
      <DialogProceedWindow
        openProceedDialog={openProceedDialog}
        setOpenProceedDialog={setOpenProceedDialog}
      />
    </>
  );
};

export default DashboardListItem;
