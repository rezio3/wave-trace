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
import { stepBoxes } from "./stepBoxesData";

const RoadMap: React.FC<ManageRoadMapProps> = (props) => {
  const handleBackButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleGetStartedBtn(e);
  };

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
      header: "Modify and enhance your ordered music",
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
