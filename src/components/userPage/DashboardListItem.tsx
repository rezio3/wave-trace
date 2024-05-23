import * as React from "react";
import { DashboardListItemProps } from "../../types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import EditOrderDialog from "./EditOrderDialog";

const DashboardListItem: React.FC<DashboardListItemProps> = (props) => {
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const handleClickEdit = () => {
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
        <Tooltip
          title={props.title}
          placement="bottom-start"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",

                  options: {
                    offset: [10, -30],
                  },
                },
              ],
            },
          }}
        >
          <TableCell component="th" scope="row">
            {props.title.length > 26 ? name : props.title}
          </TableCell>
        </Tooltip>
        <Tooltip
          title={props.description}
          placement="bottom-start"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",

                  options: {
                    offset: [10, -30],
                  },
                },
              ],
            },
          }}
        >
          <TableCell align="left">
            {props.description.length > 26 ? description : props.description}
          </TableCell>
        </Tooltip>
        <TableCell align="left">0.00$</TableCell>
        <TableCell align="left">05.05.2024</TableCell>
        <TableCell align="left">In progress...</TableCell>
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
      />
    </>
  );
};

export default DashboardListItem;
