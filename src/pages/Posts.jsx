import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//importing post component
import PostCard from "../component/PostCard";
import { fetchUserPost } from "../features/posts/postSlice";

function Posts() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserPost());
  }, []);

  //fetch posts from global state
  const allPosts = useSelector((state) => state.post.posts);

  return (
    <div>
      <div className="text-2xl mt-5 mx-5 font-bold">POSTS</div>
      <div className="grid grid-cols-3 gap-4 gap4 mt-10 mx-5">
        {allPosts.map((val, index) => {
          return <PostCard post={val} index={index} />;
        })}
      </div>
    </div>
  );
}

export default Posts;
