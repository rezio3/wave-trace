// import { DashboardListItem } from '../../types';
import * as React from "react";
import { DashboardListItemType } from "../../types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const DashboardListItem: React.FC<DashboardListItemType> = (props) => {
  const name = props.orderName.slice(0, 26) + "...";
  const description = props.orderDescription.slice(0, 26) + "...";

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="dashboard-order-item"
    >
      <TableCell component="th" scope="row" title={props.orderName}>
        {props.orderName.length > 26 ? name : props.orderName}
      </TableCell>
      <TableCell align="left" title={props.orderDescription}>
        {props.orderDescription.length > 26
          ? description
          : props.orderDescription}
      </TableCell>
      <TableCell align="left">{props.orderPrice}</TableCell>
      <TableCell align="left">{props.orderDate}</TableCell>
      <TableCell align="left">In progress...</TableCell>
      <TableCell align="right">
        <Button variant="text">
          <EditIcon className="text-white" />
        </Button>
        <Button variant="text">
          <DeleteIcon className="text-white" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DashboardListItem;
