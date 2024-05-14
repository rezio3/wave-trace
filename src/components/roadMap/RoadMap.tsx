import StepBox from "./StepBox";
import { Button } from "@mui/material";
import { ManageRoadMapProps } from "../../types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./RoadMap.scss";
import Features from "./Features";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import StraightenIcon from "@mui/icons-material/Straighten";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import EditIcon from "@mui/icons-material/Edit";

const RoadMap: React.FC<ManageRoadMapProps> = (props) => {
  const handleBackButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleGetStartedBtn(e);
  };
  const stepBoxes = [
    {
      number: "01",
      header: "Login",
      txt: "Create an account on the platform.",
    },
    {
      number: "02",
      header: "Order music for free",
      txt: "Place a free order using the form. The more detailed the description, the more precisely the order will be executed.",
    },
    {
      number: "03",
      header: "Realization in 24 hours",
      txt: "After 24h, you will receive a free one-minute sample of the music with a watermark to listen to.",
    },
    {
      number: "04",
      header: "Buy or edit",
      txt: "You can purchase your music or edit it according to your preferences.",
    },
    {
      number: "05",
      header: "Extend",
      txt: "Extend the music you ordered to a specific length.",
    },
  ];
  const features = [
    {
      header: "Music within 24 hours",
      icon: <AccessTimeIcon className="feature-icon" />,
    },
    {
      header: "Pay only if you like it",
      icon: <CurrencyExchangeIcon className="feature-icon" />,
    },
    {
      header: "Wide range of orchestral instruments",
      icon: <QueueMusicIcon className="feature-icon" />,
    },
    {
      header: "Synthesizers and electronic music",
      icon: <StraightenIcon className="feature-icon" />,
    },
    {
      header: "Free order placement",
      icon: <FormatIndentIncreaseIcon className="feature-icon" />,
    },
    {
      header: "Edit whenever you want",
      icon: <EditIcon className="feature-icon" />,
    },
  ];
  return (
    <div className="w-100 mt-4 d-flex flex-column align-items-center">
      <div className="w-100 position-relative mb-5 d-flex justify-content-center">
        <Button
          variant="text"
          className="position-absolute start-0"
          name="back"
          onClick={handleBackButton}
        >
          <ArrowBackIosIcon />
          Back
        </Button>
        <h2 className="mb-0 header-txt text-uppercase">How does it work?</h2>
      </div>
      <div className="d-flex w-100 flex-wrap justify-content-between">
        {stepBoxes.map((e) => {
          return <StepBox number={e.number} header={e.header} txt={e.txt} />;
        })}
      </div>
      <h2 className="header-txt mt-4 text-uppercase">Features</h2>
      <div className="d-flex w-100 flex-wrap justify-content-between">
        {features.map((e) => {
          return <Features header={e.header} icon={e.icon} />;
        })}
      </div>
    </div>
  );
};

export default RoadMap;
