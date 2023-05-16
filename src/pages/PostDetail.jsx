import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchPostDetail,
  fetchUserPost,
  resetPosts,
  addComment,
} from "../features/posts/postSlice";
import { Input, Button, Textarea, Typography } from "@material-tailwind/react";
import CommentCard from "../component/CommentCard";

function PostDetail() {
  const [comment, setComment] = useState("");

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetail(params));
  }, []);

  const postDetail = useSelector((state) => state.post.posts);
  const loggedInUser = useSelector((state) => state.user.user);

  const {
    iduser,
    idpost,
    caption,
    date,
    iduser_post,
    likes,
    post_image,
    username,
    comments,
  } = postDetail[0];

  const onSetComment = (event) => {
    setComment(event.target.value);
  };

  const newCommentHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setComment("");
      const commentData = {
        idpost,
        comment: event.target.value,
        iduser: loggedInUser.iduser,
        commentedUser: loggedInUser.username,
      };
      dispatch(addComment(commentData));
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-10 mb-10">
      <div className="bg-blue-100 border-black border-2 rounded-md">
        <div className="flex flex-row justify-between mt-2 mx-4">
          <div className="font-bold">ID Post: {idpost} </div>
          <div className="font-bold">By: {username} </div>
        </div>
        <div className=" mx-4 font-bold">Date: {date} </div>
        <div>
          <img
            className="object-contain h-full w-full mx-auto mt-4"
            src={`http://localhost:8000${post_image}`}
            alt={`${idpost} image`}
          />
          <div className="text-center font-bold my-4">Likes: {likes}</div>
        </div>
        <div className="bg-black text-white w-full mx-auto py-4">
          <div className=" mx-4 font-bold">CAPTION :</div>
          <div className=" mx-4">{caption}</div>
        </div>
        <div className=" w-full mx-auto py-4">
          <div className=" mx-4 font-bold">COMMENTS :</div>
          <div className="flex flex-col my-2">
            <CommentCard allcomments={comments} />
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl">
          <Textarea
            type="text"
            label="Comment"
            value={comment}
            onChange={onSetComment}
            onKeyDown={newCommentHandler}
            className="bg-gray-200 "
            containerProps={{
              className: "min-w-0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
