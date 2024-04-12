import { Button } from "@mui/material";
import "./Landing.scss";
import { HeaderText } from "../styled components/HeaderText";
import img1 from "../img/arturia.png";
import img2 from "../img/cubase.png";
import img3 from "../img/ew.png";
import img4 from "../img/hz.png";
import img5 from "../img/kontakt.png";
import img6 from "../img/pigments.png";
import img7 from "../img/spitfire.png";

const Landing = () => {
  
  return (
    <>
      <div className="h-100 d-flex flex-column justify-content-center align-items-start">
        <HeaderText className="text-white w-50 landing-header">
          Platform for bringing your musical visions and needs to life, using
          advanced production tools.
        </HeaderText>
        <Button variant="contained" className="mt-3">
          Get started
        </Button>
        <div className="position-relative carousel-container mt-5">
          <div className="carousel d-flex">
            <img src={img1} alt="Obrazek 1" />
            <img src={img2} alt="Obrazek 1" />
            <img src={img3} alt="Obrazek 1" />
            <img src={img4} alt="Obrazek 1" />
            <img src={img5} alt="Obrazek 1" />
            <img src={img6} alt="Obrazek 1" />
            <img src={img7} alt="Obrazek 1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
