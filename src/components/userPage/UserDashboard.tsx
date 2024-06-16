import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DashboardListItem from "./DashboardListItem";
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
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const UserDashboard = () => {
  const [orders, setOrders] = useState<DashboardListItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const db = getFirestore(app);

  const showOrderHandler = async () => {
    updateOrdersView(setLoading, setOrders, currentUser, "dashboard");
  };
  useEffect(() => {
    showOrderHandler();
  }, []);
  const deleteOrder = async (id: string) => {
    const deleted = {
      deleted: true,
    };
    await updateDoc(doc(db, `orders_${currentUser.email}`, id), deleted);
    showOrderHandler();
  };
  const navigate = useNavigate();
  const placeAnOrderHandler = () => {
    navigate("/newOrder");
  };
  return (
    <>
      <CssBaseline />
      <div className="container">
        <div className="dashboard-container mx-0 px-0 w-100">
          <TableContainer component={Paper} className="p-5">
            <h4>Dashboard</h4>
            {loading ? (
              <div className="w-100 d-flex justify-content-center align-items-center">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {orders.length > 0 ? (
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    className="mt-4"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Order</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Description</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Created</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Status</b>
                        </TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((e) => (
                        <DashboardListItem
                          key={uuidv4()}
                          deleteOrder={deleteOrder}
                          showOrderHandler={showOrderHandler}
                          order={e}
                        />
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <span className="text-secondary">
                      You don't have any orders yet.
                    </span>
                    <Button
                      variant="text"
                      className="mt-4"
                      onClick={placeAnOrderHandler}
                    >
                      Place an order <AddIcon className="ms-2" />
                    </Button>
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

export default UserDashboard;
