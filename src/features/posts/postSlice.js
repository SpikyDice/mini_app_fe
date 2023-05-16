import { createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

//initial state of the posts
const initialState = {
  posts: [
    {
      iduser: null,
      idpost: null,
      caption: "",
      date: "",
      iduser_post: null,
      likes: 0,
      post_image: "",
      username: "",
      comments: [],
    },
  ],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setUserPost: (state, action) => {
      state.posts = action.payload;
    },
    setNewCaption: (state, action) => {
      state.posts[action.payload.index].caption = action.payload.caption;
    },
    resetPosts: (state) => {
      state.posts = [];
    },
    deleteSpecificPost: (state, action) => {
      state.posts = state.posts.filter((val) => {
        return val.idpost !== action.payload;
      });
    },
    addNewComment: (state, action) => {
      state.posts[0].comments = action.payload;
      // state.posts[0].comments.unshift(action.payload);
    },
  },
});

export const fetchUserPost = () => {
  return async (dispatch) => {
    let response = await Axios.get(`http://localhost:8000/post/getposts`);
    if (response.data.success) {
      dispatch(setUserPost(response.data.fetchPosts));
    }
  };
};

export const changeCaption = (newCaption) => {
  return async (dispatch) => {
    let response = await Axios.post(
      `http://localhost:8000/post/updatecaption`,
      newCaption
    );
    dispatch(setNewCaption(newCaption));
  };
};

export const fetchPostDetail = (idpost) => {
  return async (dispatch) => {
    let response = await Axios.post(
      `http://localhost:8000/post/getspecificpost`,
      idpost
    );
    if (response.data.success) {
      const allData = response.data.specificPost;
      const allComment = response.data.fetchPostComment;
      const allDataWithComments = [
        { ...allData[0], comments: [...allComment] },
      ];

      dispatch(setUserPost(allDataWithComments));
    }
  };
};

export const deletePost = (idpost) => {
  return async (dispatch) => {
    let response = await Axios.post(`http://localhost:8000/post/deletepost`, {
      idpost,
    });
    if (response.data.success) {
      dispatch(deleteSpecificPost(idpost));
      alert(response.data.message);
    }
  };
};

export const addComment = (commentData) => {
  return async (dispatch) => {
    let response = await Axios.post(
      `http://localhost:8000/post/addcomment`,
      commentData
    );
    console.log(response);
    if (response.data.success) {
      alert(response.data.message);
      dispatch(addNewComment(response.data.getFiveLatestComment));
    }
  };
};

export const {
  setUserPost,
  setNewCaption,
  resetPosts,
  deleteSpecificPost,
  addNewComment,
} = postSlice.actions;

export default postSlice.reducer;
