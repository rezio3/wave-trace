import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const UserDashboard = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "divider", height: "auto", padding: "50px"}}> 
        <ul className="table-nav d-flex w-100 list-inline justify-content-between text-uppercase dashboard-list-text text-secondary ">
            <li>Order</li>
            <li>Description</li>
            <li>Hour</li>
            <li>Price</li>
            <li>Status</li>
            <li>...</li>
        </ul>
        </Box>
      </Container>
    </>
  );
};

export default UserDashboard;
