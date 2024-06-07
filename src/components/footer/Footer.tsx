import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button } from "@mui/material";
import { FooterProps } from "../../types";

const Footer: React.FC<FooterProps> = (props) => {
  const footerBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.setLandingPageSection) {
      const pageIndex = e.currentTarget.getAttribute("data-pageindex");
      props.setLandingPageSection(Number(pageIndex));
    }
  };
  return (
    <div className="container position-absolute footer-container mb-3 d-flex justify-content-between align-items-end">
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
          <Button variant="text" data-pageindex={1} onClick={footerBtnHandler}>Pricing</Button>
          <Button variant="text" data-pageindex={2} onClick={footerBtnHandler}>
            FAQ
          </Button>
          <Button variant="text" data-pageindex={3} onClick={footerBtnHandler}>
            Support
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
