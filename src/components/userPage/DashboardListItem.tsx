import * as React from "react";
import { DashboardListItemProps } from "../../types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const DashboardListItem: React.FC<DashboardListItemProps> = (props) => {
  const name = props.title.slice(0, 26) + "...";
  const description = props.description.slice(0, 26) + "...";
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="dashboard-order-item"
    >
      <TableCell component="th" scope="row" title={props.title}>
        {props.title.length > 26 ? name : props.title}
      </TableCell>
      <TableCell align="left" title={props.description}>
        {props.description.length > 26
          ? description
          : props.description}
      </TableCell>
      <TableCell align="left">0.00$</TableCell>
      <TableCell align="left">05.05.2024</TableCell>
      <TableCell align="left">In progress...</TableCell>
      <TableCell align="right">
        <Button variant="text">
          <EditIcon className="text-white" />
        </Button>
        <Button variant="text" onClick={()=>{props.deleteOrder(props.orderId)}}>
          <DeleteIcon className="text-white" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DashboardListItem;
