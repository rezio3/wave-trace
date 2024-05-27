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
import "./userNav.scss";
import { UserNavProps } from "../../types";

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
        width: "12%",
        maxWidth: 360,
        height: "fit-content",
        marginTop: "10px",
        bgcolor: "divider",
      }}
      className="position-absolute nav-box"
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
              <ListItemText primary="Tickets" />
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
