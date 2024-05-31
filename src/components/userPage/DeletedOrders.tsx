import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import {
  UserReturnState,
  UserDetails,
  DashboardListItemType,
} from "../../types";
import { useSelector } from "react-redux";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import "../../Loader.scss";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { updateOrdersView } from "./ordersManagement/updateOrderView";
import DeletedListItem from "./DeletedListItem";

const DeletedOrders = () => {
  const [orders, setOrders] = useState<DashboardListItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const db = getFirestore(app);

  const showOrderHandler = async () => {
    updateOrdersView(setLoading, setOrders, currentUser, "deletedOrders");
  };
  useEffect(() => {
    showOrderHandler();
  }, []);
  const restoreOrder = async (id: string) => {
    const deleted = {
      deleted: false,
    };
    await updateDoc(doc(db, `orders_${currentUser.email}`, id), deleted);
    showOrderHandler();
  };

  return (
    <>
      <CssBaseline />
      <div className="container">
        <div className="dashboard-container mx-0 px-0 w-100">
          <TableContainer component={Paper} className="p-5">
            {loading ? (
              <div className="w-100 d-flex justify-content-center align-items-center">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {orders.length > 0 ? (
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Created</TableCell>
                        <TableCell align="left">Status</TableCell>

                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((e) => (
                        <DeletedListItem
                          title={e.title}
                          description={e.description}
                          orderId={e.orderId}
                          createdDate={e.createdDate}
                          key={uuidv4()}
                          restoreOrder={restoreOrder}
                          showOrderHandler={showOrderHandler}
                        />
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <span className="text-secondary">
                      Your trash bin is empty. You have no deleted orders.
                    </span>
                  </div>
                )}
              </>
            )}
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default DeletedOrders;
