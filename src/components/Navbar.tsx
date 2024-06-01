import { NavbarProps } from "../types";
import SimpleDialogDemo from "./loginDialog/Dialog";
import { GiSoundWaves } from "react-icons/gi";

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <>
      <div className="d-flex justify-content-between container mt-3">
        <div className="d-flex">
          <h1 className="text-white d-flex align-items-center mt-1 me-2 header-txt ">
            Wavetrace
          </h1>
          <GiSoundWaves className="display-3 text-secondary" />
        </div>
        <SimpleDialogDemo setLandingPageSection={props.setLandingPageSection} />
      </div>
    </>
  );
};

export default Navbar;
