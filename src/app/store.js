import { configureStore } from "@reduxjs/toolkit";

//Global state
import userReducer from "../features/users/userSlice";
import postReducer from "../features/posts/postSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
