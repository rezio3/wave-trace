import SimpleDialogDemo from "./loginDialog/Dialog";
import { HeaderText } from "../styled components/HeaderText";

const Navbar = () => {
  return (
    <>
      <div className="d-flex justify-content-between text-primary position-relative container mt-3">
        <HeaderText className="text-white w-50">
          Wavetrace
        </HeaderText>
        <SimpleDialogDemo />
      </div>
    </>
  );
};

export default Navbar;
