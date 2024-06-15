import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./userNav.scss";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useMediaQuery } from "@mui/material";

const UserNav = () => {
  const [isNavRevealed, setIsNavRevealed] = useState(false);
  const navigate = useNavigate();
  const navigationHandler = (path: string) => {
    navigate(path);
  };

  const revealButtonHandler = () => {
    setIsNavRevealed(!isNavRevealed);
  };
  const is1700screen = useMediaQuery("(max-width: 1700px)");
  // useEffect(()=>{

  // },[is1700screen])
  return (
    <Box
      sx={{
        width: "12%",
        maxWidth: 360,
        height: "fit-content",
        marginTop: "0px",
        bgcolor: "grey.800",
      }}
      className={
        isNavRevealed
          ? "position-absolute nav-box nav-hidden"
          : "position-absolute nav-box"
      }
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              navigationHandler("/newOrder");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New order" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigationHandler("/dashboard");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigationHandler("/trash");
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              navigationHandler("/pricing");
            }}
          >
            <ListItemButton>
              <ListItemText primary="Pricing" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigationHandler("/faq");
            }}
          >
            <ListItemButton>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              navigationHandler("/support");
            }}
          >
            <ListItemButton>
              <ListItemText primary="Support" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      {is1700screen ? (
        <button
          className="position-absolute reveal-nav-btn"
          onClick={revealButtonHandler}
        >
          {isNavRevealed ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </button>
      ) : null}
    </Box>
  );
};
export default UserNav;
