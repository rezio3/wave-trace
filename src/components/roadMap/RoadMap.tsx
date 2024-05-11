import StepBox from "./StepBox";
import { Button } from "@mui/material";
import { ManageRoadMapProps } from "../../types";

const RoadMap: React.FC<ManageRoadMapProps> = (props) => {
  const handleBackButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleGetStartedBtn(e);
  };
  return (
    <div className="mt-5 ">
      <h2 className="header-txt">How does it work?</h2>
      <div className="d-flex">
        <StepBox />
        <StepBox />
        <StepBox />
      </div>
      <Button variant="text" className="mt-3" name="back" onClick={handleBackButton}>
        Back
      </Button>
    </div>
  );
};

export default RoadMap;
