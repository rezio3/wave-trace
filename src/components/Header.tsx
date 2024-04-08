import "../style/global.css";
import SimpleDialogDemo from "./MUI/Dialog";
import SimpleDialogDemoSingUp from "./MUI/DialogSignUp";

const Header = () => {
  return (
    <>
      <div className="header-bg text-primary position-relative container mt-3">
        <SimpleDialogDemo />
        <SimpleDialogDemoSingUp />
      </div>
    </>
  );
};

export default Header;
