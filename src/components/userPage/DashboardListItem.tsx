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
  const {
    title,
    description,
    status,
    createdDate,
    orderId,
    modifications,
    musicDemoName,
  } = props.order;
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
    checkTimeDifference(createdDate, setIsEditable);
    setOpenEditDialog(true);
  };
  const name = title.slice(0, 26) + "...";
  const descriptionTxt = description.slice(0, 26) + "...";
  const showStatusAlert = () => {
    if (!status) {
      return null;
    } else {
      return (
        <StatusAlert
          status={status}
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
          {title.length > 26 ? name : title}
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
          <Typography sx={{ p: 3 }}>{title}</Typography>
        </Popover>

        <TableCell
          align="left"
          onMouseEnter={handlePopoverDescriptionOpen}
          onMouseLeave={handlePopoverDescriptionClose}
        >
          {description.length > 26 ? descriptionTxt : description}
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
          <Typography sx={{ p: 3 }}>{description}</Typography>
        </Popover>
        <TableCell align="left">{createdDate}</TableCell>
        {showStatusAlert()}

        <TableCell align="right">
          {status === "inProgress" ? (
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
                props.deleteOrder(orderId);
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
        title={title}
        description={description}
        orderId={orderId}
        showOrderHandler={props.showOrderHandler}
        isEditable={isEditable}
      />
      <DialogProceedWindow
        openProceedDialog={openProceedDialog}
        setOpenProceedDialog={setOpenProceedDialog}
        modifications={modifications}
        musicDemoName={musicDemoName}
        orderId={orderId}
      />
    </>
  );
};

export default DashboardListItem;
