import { useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/background/VideoBG";
import UserPage from "./components/userPage/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails, UserReturnState } from "./types/types";
import "./Loader.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Landing from "./components/Landing";
import CssBaseline from "@mui/material/CssBaseline";
import "./style/global.scss";
import { loginAndRegisterUser } from "./services/loginAndRegisterUser";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    loginAndRegisterUser(dispatch);
  }, []);

  const user = useSelector<UserReturnState, UserDetails>(
    (state) => state.data.user.user
  );
  const isLoading = useSelector<UserReturnState, Boolean>(
    (state) => state.data.user.isLoading
  );

  // console.log(user);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App position-absolute">
        {isLoading === true ? (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ) : null}
        {user.email ? (
          <>
            <Navbar />
            <UserPage />
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
