import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import ResetPassword from "./pages/ResetPassword";
import InsertNewPassword from "./pages/InsertNewPassword";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing checkLogin function from userSlice
import { checkLogin, logoutUser } from "./features/users/userSlice";
import UserProfile from "./pages/UserProfile";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import FrontPage from "./pages/FrontPage";

function App() {
  document.body.style.backgroundColor = "#E6E6F0";

  //define navigate
  const navigate = useNavigate();

  //define dispatch
  const dispatch = useDispatch();

  //get usertoken from localstorage
  const userToken = localStorage.getItem(`user_token`);

  //get useGlobal
  const userGlobal = useSelector((state) => state.user);

  useEffect(() => {
    if (userToken) {
      dispatch(checkLogin(userToken));
    } else {
      dispatch(logoutUser);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/posts/:id/post/:idpost" element={<PostDetail />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/user/verification/:token" element={<Verification />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/insertnewpassword/:token"
          element={<InsertNewPassword />}
        />
        <Route path="/home/:id" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        {!userGlobal.iduser ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : null}
      </Routes>
    </>
  );
}

export default App;
