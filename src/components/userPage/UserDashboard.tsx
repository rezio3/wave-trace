import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DashboardListItem from "./DashboardListItem";
import { v4 as uuidv4 } from 'uuid';

const UserDashboard = () => {
  const orderTemplate = [
    {
      orderName: "Muzyka do gry - główny motyw oparty na postaci głównej",
      orderDescription:
        "Potrzebuję muzyki do postaci głównej w mojej grze. Postać jest ciemnym charakterem, z lekko odklejonym humorem. Zależy mi, żeby muzyka była satyryczna ale nie komediowa, troche poważna i straszna. Prowadzić ma obój i fagot.",
      orderPrice: "0$",
      orderDate: "05.05.2024",
      orderStatus: "pending...",
    },
    {
      orderName: "Musical",
      orderDescription:
        "Szukam podkładu muzycznego do teledysku. Temat wakacyjny, szybki rytm i wesoła melodia. Zależy mi, żeby muzyka była satyryczna ale nie komediowa, troche poważna i straszna. Prowadzić ma obój i fagot.",
      orderPrice: "0$",
      orderDate: "05.05.2024",
      orderStatus: "pending...",
    },
    {
      orderName: "Trailer filmowy o apokalipsie zombie.",
      orderDescription:
        "Potrzebuję scieżki dźwiękowej. Kręcę trailer o apokalipsie zombie. Postać jest ciemnym charakterem, z lekko odklejonym humorem. Zależy mi, żeby muzyka była satyryczna ale nie komediowa, troche poważna i straszna. Prowadzić ma obój i fagot.",
      orderPrice: "0$",
      orderDate: "05.05.2024",
      orderStatus: "pending...",
    },
  ];
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className="dashboard-container">
        <TableContainer component={Paper} className="p-5">
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
              {orderTemplate.map((e) => (
                <DashboardListItem
                  orderName={e.orderName}
                  orderDescription={e.orderDescription}
                  orderPrice={e.orderPrice}
                  orderDate={e.orderDate}
                  orderStatus={e.orderStatus}
                  key={uuidv4()}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default UserDashboard;
