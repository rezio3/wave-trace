import Button from "@mui/material/Button";
import { LoginViewType } from "../../types";

const ChangeDialogWindowBtn: React.FC<LoginViewType> = ({loginViewHandler, isLoginView}) => {
    const handleChangeLoginWindowBtn = ()=>{
        loginViewHandler()
    }
  return (
    <Button
      variant="text"
      className="p-2 login-link-button"
      onClick={handleChangeLoginWindowBtn}
    >
        {isLoginView ? "Don't have an account yet?" : "Already have an account?"}
      
    </Button>
  );
};

export default ChangeDialogWindowBtn;
