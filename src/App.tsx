import { useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/background/VideoBG";
import UserPage from "./components/userPage/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import {
  UserDetails,
  UserReturnState,
  loginUser,
  setLoading,
} from "./features/userSlice";
import "./Loader.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Landing from "./components/Landing";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
  const user = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const isLoading = useSelector<UserReturnState, Boolean>(
    (state) => state.data.user.isLoading
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App position-absolute">
        {isLoading === true ? (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ) : null}

        {user.userName?.length ? (
          <>
            <UserPage />
            <Navbar />
            <VideoBG />
          </>
        ) : (
          <>
            <Navbar />
            <div className="container h-75">
              <Landing />
            </div>
            <VideoBG />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
