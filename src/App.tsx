import { useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/background/VideoBG";
import MainUserPage from "./components/MainUserPage";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { UserDetails, UserReturnState, loginUser, setLoading } from "./features/userSlice";
import "./Loader.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  // auth.invalidEmail();

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      dispatch(setLoading(false));
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            userName: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        console.log("User is not logged in");
      }
    });
  }, []);
  // Any type to fix
  const user = useSelector<UserReturnState, UserDetails>((state) => state.data.user.user);
  const isLoading = useSelector<UserReturnState, Boolean>((state) => state.data.user.isLoading);
  const currentUserName = () =>{
    if(user.userName === null) {
      return false
    } else {
      return user.userName;
    }
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App position-absolute">
        {isLoading === true ? (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ) : null}

        {currentUserName() ? (
          <>
            <MainUserPage />
            <Navbar />
            <VideoBG />
          </>
        ) : (
          <>
            <Navbar />
            <VideoBG />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
