import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

type UserNavProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const UserNav: React.FC<UserNavProps> = (props) => {
  const newOrderHandler = () => {
    props.setPage(1);
  };
  const dashboardHandler = () => {
    props.setPage(0);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        height: "80%",
        marginTop: "10px",
        bgcolor: "divider",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding onClick={newOrderHandler}>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New order" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={dashboardHandler}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
export default UserNav;
