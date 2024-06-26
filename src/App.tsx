import { useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/background/VideoBG";
import UserPage from "./components/userPage/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails, UserReturnState } from "./types";
import "./Loader.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Landing from "./components/Landing";
import CssBaseline from "@mui/material/CssBaseline";
import "./style/global.scss";
import { loginAndRegisterUser } from "./services/loginAndRegisterUser";
import Footer from "./components/footer/Footer";
import "./components/footer/Footer.scss";
import FaqPage from "./components/faq/FaqPage";
import Support from "./components/support/Support";
import Pricing from "./components/pricing/Pricing";
import { Routes, Route } from "react-router";
import { HashRouter } from "react-router-dom";

function App() {
  const [ladingPageSection, setLandingPageSection] = useState(0);
  const handleBackButton = () => {
    setLandingPageSection(0);
  };
  // const sections = [
  //   <Landing />,
  //   <Pricing isUserLoggedIn={false} handleBackButton={handleBackButton} />,
  //   <FaqPage isUserLoggedIn={false} handleBackButton={handleBackButton} />,
  //   <Support isUserLoggedIn={false} handleBackButton={handleBackButton} />,
  // ];
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
  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App position-absolute">
          {isLoading === true ? (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          ) : null}
          {user.email ? (
            <div className="app-container">
              <div>
                <Navbar setLandingPageSection={setLandingPageSection} />
                <UserPage />
              </div>
              <Footer isUserLoggedIn={true} />
              <VideoBG />
            </div>
          ) : (
            <div className="app-container">
              <div>
                <Navbar />
                <div className="container">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                      path="/pricing"
                      element={<Pricing isUserLoggedIn={false} />}
                    />
                    <Route
                      path="/faq"
                      element={<FaqPage isUserLoggedIn={false} />}
                    />
                    <Route
                      path="/support"
                      element={<Support isUserLoggedIn={false} />}
                    />
                  </Routes>
                </div>
              </div>
              {/* <div className="container h-75">{sections[ladingPageSection]}</div> */}
              <Footer
                setLandingPageSection={setLandingPageSection}
                isUserLoggedIn={false}
              />
              <VideoBG />
            </div>
          )}
        </div>
        <div className="small-screen-alert">
          <span>
            This is a desktop application. <br />
            Please open the page on a larger screen.
          </span>
          <VideoBG />
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
