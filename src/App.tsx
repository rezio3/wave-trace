import { useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/VideoBG";
import MainUserPage from "./components/MainUserPage";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { loginUser, setLoading } from "./features/userSlice";
import "./Loader.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
            username: authUser.displayName,
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
  const user = useSelector((state: any) => state.data.user);
  const isLoading = useSelector((state: any) => state.data.user.isLoading);
  console.log(isLoading === true);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {isLoading === true ? (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        ) : null}

        {user.user.username ? (
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
