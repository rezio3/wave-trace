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
import { getDatabase, ref, get } from "firebase/database";
import {
  UserReturnState,
  UserDetails,
  DashboardListItemType,
} from "../../types";
import { useSelector } from "react-redux";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import "../../Loader.scss";
import { doc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const UserDashboard = () => {
  const [orders, setOrders] = useState<DashboardListItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );

  useEffect(() => {
    const showOrderHandler = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "orders")).catch(
        () => {
          return;
        }
      );
      let tempArr: any[] = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
          setOrders(tempArr);
          setLoading(false);
        });
      }
      // const db = getDatabase(app);
      // const dbRef = ref(db, `${currentUser.uid}/orders`);
      // const snapshot = await get(dbRef);
      // if (snapshot.exists()) {
      //   setOrders(Object.values(snapshot.val()));
      //   setLoading(false);
      // } else if (snapshot.val() === null) {
      //   setLoading(false);
      // } else {
      //   alert("error");
      // }
      // console.log(orders);
    };
    showOrderHandler();
  }, []);

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
                          key={uuidv4()}
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
