import { auth } from "../firebase";
import { loginUser, setLoading } from "../reducers/userSlice";
import { AppDispatch } from "../types";

export const loginAndRegisterUser = (dispatch: AppDispatch) => {
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
};