import * as React from "react";
import { DeletedListItemProps } from "../../types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import "./dashboard.scss";
import Alert from "@mui/material/Alert";

const DeletedListItem: React.FC<DeletedListItemProps> = (props) => {
  const [anchorElTitle, setAnchorElTitle] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElDescription, setAnchorElDescription] =
    React.useState<HTMLElement | null>(null);
  const [anchorElDate, setAnchorElDate] = React.useState<HTMLElement | null>(
    null
  );

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
        <TableCell align="left" className="d-flex align-items-center">
          <Alert variant="outlined" severity="error" className="deleted-alert">
            Deleted
          </Alert>
          <div
            onMouseEnter={handlePopoverDateOpen}
            onMouseLeave={handlePopoverDateClose}
          >
            <InfoIcon className="ms-3" />
          </div>
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
              vertical: -20,
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
              Your order has been deleted. It will not be processed. To resume
              the order, click the restore button.
            </Typography>
          </Popover>
        </TableCell>

        <TableCell align="right">
          <Tooltip title="Restore">
            <Button
              variant="text"
              onClick={() => {
                props.restoreOrder(props.orderId);
              }}
            >
              <RestoreFromTrashIcon className="text-white" />
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DeletedListItem;
