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
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import "./dashboard.scss";

const DashboardListItem: React.FC<DashboardListItemProps> = (props) => {
  const [anchorElTitle, setAnchorElTitle] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElDescription, setAnchorElDescription] =
    React.useState<HTMLElement | null>(null);
  const [anchorElDate, setAnchorElDate] = React.useState<HTMLElement | null>(
    null
  );
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
  const handlePopoverDateOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDate(event.currentTarget);
  };

  const handlePopoverDateClose = () => {
    setAnchorElDate(null);
  };

  const openTitle = Boolean(anchorElTitle);
  const openDescription = Boolean(anchorElDescription);
  const openDate = Boolean(anchorElDate);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const handleClickEdit = () => {
    checkTimeDifference(props.createdDate, setIsEditable);
    setOpenEditDialog(true);
  };

  const name = props.title.slice(0, 26) + "...";
  const description = props.description.slice(0, 26) + "...";
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
          onClose={handlePopoverTitleClose}
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
        <TableCell align="right">
          <Tooltip title="Edit">
            <Button variant="text" onClick={handleClickEdit}>
              <EditIcon className="text-white" />
            </Button>
          </Tooltip>
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
    </>
  );
};

export default DashboardListItem;
