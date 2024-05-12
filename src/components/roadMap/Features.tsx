import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material";
import { IconTypeMap } from "@mui/material";

type FeaturesProps = {
  header: string;
  icon: any;
};

const Features: React.FC<FeaturesProps> = (e) => {
  return (
    <div className="mt-1 position-relative">
      <div className="features-card position-relative w-75 d-flex flex-column justify-content-between">
        <CardContent className="d-flex flex-column justify-content-around align-items-center h-100">
          {e.icon}
          <h5 className="text-uppercase feature-header mb-0 text-center">
            {e.header}
          </h5>
        </CardContent>
      </div>
    </div>
  );
};

export default Features;
