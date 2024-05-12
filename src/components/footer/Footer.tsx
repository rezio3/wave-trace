import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <div className="container position-absolute footer-container mb-3 d-flex justify-content-between align-items-end">
      <span className="text-secondary">Wavetrace &copy; 2024</span>
      <div>
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
      <div>
        <Button variant="text">FAQ</Button>
        <Button variant="text">Support</Button>
      </div>
    </div>
  );
};

export default Footer;
