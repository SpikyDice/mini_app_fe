import { createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

//Initial state is defined here
const initialState = {
  user: {},
  dataChange: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.user = action.payload;
    },
    resetLoggedInUser: (state) => {
      console.log("Logout is pressed!");
      state.user = {};
    },
    setDataChange: (state) => {
      state.dataChange = true;
    },
    resetDataChange: (state) => {
      state.dataChange = false;
    },
  },
});

export const recordUser = async (userData) => {
  //Passing userdata received to BE
  const response = await Axios.post(
    `http://localhost:8000/user/register`,
    userData
  );

  //alert if fail
  if (response.data.success === false) {
    alert(response.data.message);
    return;
  }

  return response.data;
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    let response = await Axios.post(
      `http://localhost:8000/user/login`,
      userData
    );
    if (!response.data.success) {
      return response.data;
    } else {
      //set token into localstorage
      localStorage.setItem(`user_token`, response.data.token);

      //destructuring passing data
      const { userData } = response.data;

      //dispatching userdata into global state
      dispatch(loggedInUser(userData));

      //returning success value along with the data
      return response.data;
    }
  };
};

export const tokenVerification = async (token) => {
  try {
    const response = await Axios.post(
      `http://localhost:8000/user/verification`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    alert(error);
  }
};

export const resetPassword = async (userEmail) => {
  try {
    const response = await Axios.post(
      `http://localhost:8000/user/resetpassword`,
      userEmail
    );

    //if email not found
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const sendNewUserPassword = async (password, token) => {
  try {
    console.log(password, token);
    const response = await Axios.post(
      `http://localhost:8000/user/insertnewpassword`,
      password,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(resetLoggedInUser());
    localStorage.removeItem(`user_token`);
  };
};

export const checkLogin = (token) => {
  return async (dispatch) => {
    const response = await Axios.post(
      `http://localhost:8000/user/check-login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(loggedInUser(response.data.data));
  };
};

export const {
  loggedInUser,
  resetLoggedInUser,
  setDataChange,
  resetDataChange,
} = userSlice.actions;

export default userSlice.reducer;
