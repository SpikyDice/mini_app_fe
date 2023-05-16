import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import material tailwind component
import { Input, Button, Textarea, Typography } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import { changeCaption } from "../features/posts/postSlice";
import { deletePost } from "../features/posts/postSlice";

function PostCard(props) {
  const navigate = useNavigate();
  const { post, index } = props;
  const dispatch = useDispatch();
  const { id } = useParams();
  //edit fullname handler
  const [isEdit, setIsEdit] = useState(false);
  const [caption, setCaption] = useState("");
  const onSetCaption = (event) => {
    setCaption(event.target.value);
  };

  const changeCaptionHandler = () => {
    const newCaption = {
      caption,
      idpost: post.idpost,
      index,
    };
    dispatch(changeCaption(newCaption));
  };

  return (
    <div>
      <div className="bg-blue-100 border-black border-2 rounded-md">
        <div className="flex flex-row justify-between mt-2 mx-4">
          <div className="font-bold">ID Post: {post.idpost}</div>
          <div className="font-bold">By: {post.username}</div>
        </div>
        <div className=" mx-4 font-bold">Date: {post.date}</div>
        <div>
          <img
            className="object-contain h-40 w-40 mx-auto mt-4 hover:cursor-pointer"
            onClick={() => navigate(`/posts/${id}/post/${post.idpost}`)}
            src={`http://localhost:8000${post.post_image}`}
            alt={`${post.idpost} image`}
          />
          <div className="text-center">Likes: {post.likes}</div>
        </div>
        <div>
          <Typography className="font-bold mt-2 mx-4">Caption</Typography>
          <Typography className=" mx-4">{post.caption}</Typography>
        </div>
        <div className="mt-4 bg-gray-200 rounded-xl" hidden={!isEdit}>
          <Textarea
            type="text"
            label="New Caption"
            value={caption}
            onChange={onSetCaption}
            className="bg-gray-200 "
            containerProps={{
              className: "min-w-0",
            }}
          />
        </div>
        <div className="flex flex-row justify-evenly my-4">
          <Button
            disabled={post.iduser != id}
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit Caption
          </Button>
          <Button hidden={!isEdit} onClick={changeCaptionHandler}>
            Submit
          </Button>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <Button
            disabled={post.iduser != id}
            onClick={() => dispatch(deletePost(post.idpost))}
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
