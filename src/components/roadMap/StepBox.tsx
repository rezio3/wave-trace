import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { StepBoxProps } from "../../types";

const StepBox: React.FC<StepBoxProps> = (e) => {
  return (
    <div className="mt-3 position-relative">
      <h3 className="position-absolute step-number-header">{e.number}</h3>
      <div className="glass-card position-relative w-75 d-flex flex-column justify-content-between">
        <CardContent>
          <h5 className="text-uppercase step-header">{e.header}</h5>
          <p className="step-txt">{e.txt}</p>
        </CardContent>
        <CardActions className="step-box-buttons">
          <Button size="small">Learn More</Button>
        </CardActions>
      </div>
    </div>
  );
};

export default StepBox;
