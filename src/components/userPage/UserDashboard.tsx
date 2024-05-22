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
import { Order } from "../../types";
import {
  UserReturnState,
  UserDetails,
  DashboardListItemType,
} from "../../types";
import { useSelector } from "react-redux";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import "../../Loader.scss";
import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const UserDashboard = () => {
  const [orders, setOrders] = useState<DashboardListItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const db = getFirestore(app);

  const showOrderHandler = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(
      collection(db, `orders_${currentUser.email}`)
    ).catch(() => {
      return;
    });
    let tempArr: Order[] = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data() as Order);
        setOrders(tempArr);
        setLoading(false);
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    showOrderHandler();
  }, []);
  const deleteOrder = async (id: string) => {
    await deleteDoc(doc(db, `orders_${currentUser.email}`, id));
    showOrderHandler();
  };
  console.log(orders);
  // ????????????????????????????????????
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
                        <DashboardListItem
                          title={e.title}
                          description={e.description}
                          orderId={e.orderId}
                          key={uuidv4()}
                          deleteOrder={deleteOrder}
                        />
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <>
                    <h1>No content</h1>
                  </>
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
