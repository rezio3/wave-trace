import SimpleDialogDemo from "./loginDialog/Dialog";
import { GiSoundWaves } from "react-icons/gi";

const Navbar = () => {
  return (
    <>
      <div className="d-flex justify-content-between text-primary container mt-3">
        <div className="d-flex">
          <h1 className="text-white d-flex align-items-center mt-1 me-2 header-txt">
            Wavetrace
          </h1>
          <GiSoundWaves className="display-3 text-secondary" />
        </div>
        <SimpleDialogDemo />
      </div>
    </>
  ); 
};

export default Navbar;
