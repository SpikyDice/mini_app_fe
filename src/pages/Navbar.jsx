import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//import material-tailwind
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

//import reset logged in user
import { logoutUser } from "../features/users/userSlice";

function Navbar() {
  //hooks to make signin and login button dissapear when login
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  //fetching user globalstate
  const { user } = useSelector((state) => state.user);

  //define navigate
  const navigate = useNavigate();

  //define dispatch
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // useEffect(() => {
  //   console.log("Hurray");
  // }, []);

  return (
    <div className="flex flex-row justify-between h-20 bg-black">
      <div
        className="my-auto text-white ml-10 hover:cursor-pointer font-bold"
        onClick={() => navigate(`/`)}
      >
        DASHBOARD
      </div>
      <div className=" flex flex-row justify-between font-bold items-center">
        {/* useless since already defined in App.js */}
        {user.iduser ? (
          <div className="flex flex-row mr-10">
            <div
              className="my-auto text-white mr-20 hover:cursor-pointer font-bold"
              onClick={() => navigate(`/posts/${user.iduser}`)}
            >
              ALL POSTS
            </div>
            <div
              className="my-auto text-white mr-20 hover:cursor-pointer font-bold"
              onClick={() => navigate(`/home/${user.iduser}`)}
            >
              CREATE POST
            </div>
            <div className="my-auto text-white mr-10">
              WELCOME {`${user.username.toUpperCase()}`}
            </div>

            <Menu>
              <MenuHandler>
                <Avatar
                  variant="circular"
                  alt=""
                  className="cursor-pointer bg-blue-500"
                  src={
                    !`http://localhost:8000/${user.profile.profile_picture}`
                      ? `http://localhost:8000/Default-1684152979320.jpg`
                      : `http://localhost:8000/${user.profile.profile_picture}`
                  }
                />
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2">
                  <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography
                    onClick={() => navigate(`/profile/${user.iduser}`)}
                    variant="small"
                    className="font-normal"
                  >
                    Edit Profile
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-normal">
                    Help
                  </Typography>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 ">
                  <PowerIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography
                    onClick={logOutUser}
                    variant="small"
                    className="font-normal"
                  >
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate("/login")}
              className="my-auto text-white mr-10"
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/register")}
              className="my-auto text-white mr-10 font-bold"
            >
              SIGN UP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
