import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button } from "@mui/material";
import { FooterProps } from "../../types";
import { NavLink } from "react-router-dom";

const Footer: React.FC<FooterProps> = (props) => {
  const footerBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.setLandingPageSection) {
      const pageIndex = e.currentTarget.getAttribute("data-pageindex");
      props.setLandingPageSection(Number(pageIndex));
    }
  };
  return (
    <div className="container mb-3 mt-4 d-flex justify-content-between align-items-end">
      <span className="text-secondary">Wavetrace &copy; 2024</span>
      <div
        className={
          !props.isUserLoggedIn ? "position-absolute b-0 socials-container" : ""
        }
      >
        <Button variant="text" className="social-icon">
          <InstagramIcon />
        </Button>
        <Button variant="text" className="social-icon">
          <XIcon />
        </Button>
        <Button variant="text" className="social-icon">
          <YouTubeIcon />
        </Button>
      </div>
      {!props.isUserLoggedIn ? (
        <div>
          <NavLink to="/pricing">
            <Button
              variant="text"
              data-pageindex={1}
              onClick={footerBtnHandler}
            >
              Pricing
            </Button>
          </NavLink>
          <NavLink to="/faq">
            <Button
              variant="text"
              data-pageindex={2}
              onClick={footerBtnHandler}
            >
              FAQ
            </Button>
          </NavLink>
          <NavLink to="/support">
            <Button
              variant="text"
              data-pageindex={3}
              onClick={footerBtnHandler}
            >
              Support
            </Button>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
