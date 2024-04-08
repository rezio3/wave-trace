import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import VideoBG from "./components/VideoBG";
import MainUserPage from "./components/MainUserPage";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { loginUser, setLoading } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      
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
  return (
    <div className="App">
      {user.user.username ? (
        <>
          <MainUserPage />
          <Header />
          <VideoBG />
        </>
      ) : (
        <>
          <Header />
          <VideoBG />
        </>
      )}
    </div>
  );
}

export default App;
