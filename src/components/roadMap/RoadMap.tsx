import StepBox from "./StepBox";
import { Button } from "@mui/material";

const RoadMap = () => {
  return (
    <div className="mt-5 ">
      <h2 className="header-txt">How does it work?</h2>
      <div className="d-flex">
        <StepBox />
        <StepBox />
        <StepBox />
      </div>
      <Button variant="text" className="mt-3">
        Back
      </Button>
    </div>
  );
};

export default RoadMap;
