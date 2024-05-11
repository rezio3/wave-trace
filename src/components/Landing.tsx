import { Button } from "@mui/material";
import "./Landing.scss";
import arturiaLogo from "../img/arturia.png";
import cubaseLogo from "../img/cubase.png";
import ewLogo from "../img/ew.png";
import hzLogo from "../img/hz.png";
import kontaktLogo from "../img/kontakt.png";
import pigmentsLogo from "../img/pigments.png";
import spitfireLogo from "../img/spitfire.png";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import RoadMap from "./roadMap/RoadMap";

const Landing = () => {
  const [isRoadMap, setIsRoadMap] = useState(false);
  const roadMapRef = useRef(null);

  const handleGetStartedBtn = () => {
    gsap.to(".landing-container", {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "power2",
      display: "none",
    });
    setTimeout(() => {
      gsap.to(".road-map-wrapper", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        display: "block",
        ease: "power2",
      });
    }, 500);
  };

  return (
    <>
      <div className="road-map-wrapper">
        <RoadMap />
      </div>

      <div className="h-100 d-flex flex-column justify-content-center align-items-start landing-container">
        <h2 className="text-white w-50 landing-header header-txt">
          Platform for bringing your musical visions and needs to life, using
          advanced production tools.
        </h2>
        <Button
          variant="contained"
          className="mt-3"
          onClick={handleGetStartedBtn}
        >
          Get started
        </Button>
        <div className="position-relative carousel-container mt-5">
          <div className="carousel d-flex">
            <img src={arturiaLogo} alt="arturia logo" />
            <img src={cubaseLogo} alt="cubase logo" />
            <img src={ewLogo} alt="east west logo" />
            <img src={hzLogo} alt="hans zimmer strings logo" />
            <img src={kontaktLogo} alt="kontakt logo" />
            <img src={pigmentsLogo} alt="pigments logo" />
            <img src={spitfireLogo} alt="spitfire logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
