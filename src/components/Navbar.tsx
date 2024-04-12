import SimpleDialogDemo from "./LoginDialog/Dialog";
import { HeaderText } from "../styled components/HeaderText";
import { GiSoundWaves } from "react-icons/gi";

const Navbar = () => {
  return (
    <>
      <div className="d-flex justify-content-between text-primary position-relative container mt-3">
        <div className="d-flex">
        <HeaderText className="text-white d-flex align-items-center mt-1 me-2">
          Wavetrace
        </HeaderText>
        <GiSoundWaves className="display-3 text-secondary"/>

        </div>
        <SimpleDialogDemo />
      </div>
    </>
  );
};

export default Navbar;
