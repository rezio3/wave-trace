import Button from "@mui/material/Button";
import { loginViewType } from "../../types";

const ChangeDialogWindowBtn: React.FC<loginViewType> = ({loginViewHandler, isLoginView}) => {
    const handleChangeLoginWindowBtn = ()=>{
        loginViewHandler()
    }
  return (
    <Button
      variant="text"
      className="mt-3 p-2 login-link-button"
      onClick={handleChangeLoginWindowBtn}
    >
        {isLoginView ? "Don't have an account yet?" : "Already have an account?"}
      
    </Button>
  );
};

export default ChangeDialogWindowBtn;
