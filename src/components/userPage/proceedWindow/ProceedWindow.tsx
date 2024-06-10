import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { TextField } from "@mui/material";
import "./proceedWindow.scss";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="tab-panel">
          {children}
        </Box>
      )}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

export default function FloatingActionButtonZoom() {
  //   const storage = getStorage(app);
  //   const music = ref(storage, `aoal.mp3`);
  //   const musicUrl = getDownloadURL(ref(storage, "aoal.mp3")).then(async () => {
  //     ;
  //   });
  //   console.log(musicUrl);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary" as "primary",
      sx: fabStyle as SxProps,
      icon: <ShoppingCartIcon />,
      label: "Shop",
    },
    {
      color: "secondary" as "secondary",
      sx: fabStyle as SxProps,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit" as "inherit",
      sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
      icon: <OpenInFullIcon />,
      label: "Expand",
    },
  ];
  const [modDesc, setModDesc] = React.useState("");
  const [extendDesc, setExtendDesc] = React.useState("");
  const modifyDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModDesc(e.target.value);
  };
  const extendDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendDesc(e.target.value);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 600,
        position: "relative",
        minHeight: 400,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Listen and buy" {...a11yProps(0)} />
          <Tab label="Modify" {...a11yProps(1)} />
          <Tab label="Extend" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className="mb-5"
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Listen to a minute-long version with a watermark. If you like what you
          hear, purchase the version without the watermark and in full quality.
          {/* <audio controls>
            <source src="horse.ogg" type="audio/ogg" />
            <source src="horse.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio> */}
          <h3 className="mt-5 proceed-price">$49</h3>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          Tell us what changes you'd like in the proposed music. The editing
          cost will be deducted from the total price of the track.
          <TextField
            id="outlined-multiline-static"
            label="Description of modification"
            multiline
            rows={4}
            onChange={modifyDescriptionHandler}
            value={modDesc}
            className="w-75 mt-3"
          />
          <h3 className="mt-5">$5</h3>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Extend the ordered music to a specific length. If you have any
          additional comments, feel free to suggest them. Payment for the order
          is upfront.
          <TextField
            id="outlined-multiline-static"
            label="Description of extension (optional)"
            multiline
            rows={4}
            onChange={extendDescriptionHandler}
            value={extendDesc}
            className="w-75 mt-3"
          />
          <h3 className="mt-5 proceed-price">$39</h3>
        </TabPanel>
      </SwipeableViews>

      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
