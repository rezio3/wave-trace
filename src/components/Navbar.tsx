import "../style/global.css";
import SimpleDialogDemo from "./LoginDialog/Dialog";

const Navbar = () => {
  return (
    <>
      <div className="d-flex justify-content-end header-bg text-primary position-relative container mt-3">
        <SimpleDialogDemo />
      </div>
    </>
  );
};

export default Navbar;
