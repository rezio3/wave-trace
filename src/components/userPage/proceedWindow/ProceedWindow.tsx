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
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { app } from "../../../firebase";
import Slider from "@mui/material/Slider";
import { getFirestore } from "firebase/firestore";

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
        <Box
          sx={{ p: 3 }}
          className="tab-panel d-flex flex-column justify-content-between"
        >
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

export default function FloatingActionButtonZoom(props: {
  modifications: number;
}) {
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
  const [musicUrl, setMusicUrl] = React.useState("");
  const [priceForOneMin, setPriceForOneMin] = React.useState(49);
  const modifyDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModDesc(e.target.value);
  };
  const extendDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendDesc(e.target.value);
  };

  React.useEffect(() => {
    const storage = getStorage(app);
    getDownloadURL(ref(storage, "music/aoal.mp3"))
      .then((url) => {
        setMusicUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
    const db = getFirestore(app);
    const priceReducer = 5 * props.modifications;
    let updatedPriceForOneMin = 49 - priceReducer;
    if (updatedPriceForOneMin <= 0) {
      updatedPriceForOneMin = 0;
    }
    setPriceForOneMin(updatedPriceForOneMin);
  }, []);

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
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>
            <span>
              Listen to a one-minute sample with a watermark. If you enjoy it,
              you can buy the full-quality version without the watermark.
            </span>
            <audio controls src={musicUrl} className="mt-5" preload="none" />
            <p className="mt-5">
              After purchase, you will still have the option to extend or modify
              the track.
            </p>
            <p>
              {props.modifications > 0
                ? `You have already made ${props.modifications} modifications
              to this track.`
                : "You haven't made any modifications to this track yet."}
            </p>
          </div>
          <span className="proceed-price mb-1">Cost: ${priceForOneMin}</span>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div>
            <span>
              Tell us what changes you'd like in the proposed music. The editing
              cost will be deducted from the total price of the track.
            </span>
            <TextField
              id="outlined-multiline-static"
              label="Description of modification"
              multiline
              rows={3}
              onChange={modifyDescriptionHandler}
              value={modDesc}
              className="w-75 mt-3"
            />
          </div>
          <p className="mt-2">
            The modification fee is included in the price of a one-minute track.
            After paying $5 for the modification, it will be deducted from the
            price of the one-minute track.
          </p>
          <h3 className="proceed-price mb-1">Cost: $5</h3>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Extend the ordered music to a specific length. If you have any
          additional comments, feel free to suggest them.
          <TextField
            id="outlined-multiline-static"
            label="Description of extension (optional)"
            multiline
            rows={2}
            onChange={extendDescriptionHandler}
            value={extendDesc}
            className="w-75 mt-2"
          />
          <Slider
            aria-label="modification-quantity"
            defaultValue={1}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks
            min={1}
            max={9}
            className="ms-2 w-50 mt-3"
            name="mod-one-min"
            // onChange={modVersionSliderHandler}
          />
          <p className="">
            Specify by how many minutes you want to extend the music.
            <br />
            $39 for each additional minute. Currently, your track will be 2
            minutes long.
          </p>
          <h3 className="proceed-price">Cost: $88</h3>
        </TabPanel>
      </SwipeableViews>

      {fabs.map((fab, index) => {
        return (
          <>
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
          </>
        );
      })}
    </Box>
  );
}
