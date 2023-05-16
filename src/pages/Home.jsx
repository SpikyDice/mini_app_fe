import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin, loggedInUser } from "../features/users/userSlice";

//import material tailwind component
import { Input, Button, Textarea, Typography } from "@material-tailwind/react";

//importing dataChange global state
import { setDataChange, resetDataChange } from "../features/users/userSlice";

import Axios from "axios";

function Home() {
  //define navigate
  const navigate = useNavigate();

  //define dispatch
  const dispatch = useDispatch();

  //get id from global state of user
  const { user } = useSelector((state) => state.user);
  const { iduser } = user;

  //set Image file for preview
  const [file, setFile] = useState(null);

  //event handler when user upload image file
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  //onInput handler
  const [onInput, setOnInput] = useState(false);

  //edit fullname handler
  const [caption, setCaption] = useState("");
  const onSetCaption = (event) => setCaption(event.target.value);

  //button upload image handler
  const uploadImage = async () => {
    if (file) {
      const obj = {
        id: iduser,
        caption,
      };

      let formData = new FormData();
      formData.append(`file`, file);
      formData.append(`data`, JSON.stringify(obj));

      setOnInput(true);
      const response = await Axios.post(
        "http://localhost:8000/addpost",
        formData
      );
      setOnInput(false);

      if (response.data.success) {
        alert("Data successfully added");
        navigate(`/posts/${iduser}`);
      }
    } else {
      alert("Select image first");
    }
  };

  //get usertoken from localstorage
  const userToken = localStorage.getItem(`user_token`);

  // useEffect(() => {
  //   console.log("Home useeffect is running");
  // }, []);

  return (
    <div className="flex flex-row justify-center mt-20">
      <div className="relative flex flex-col gap-5 w-full max-w-[24rem]">
        <div className="font-bold">CREATE YOUR OWN POST</div>
        <div>
          <Typography variant="h6" className="pl-2">
            Caption
          </Typography>
          <Textarea
            type="text"
            label="Caption"
            value={caption}
            onChange={onSetCaption}
            //   onChange={onChange}
            className="pr-20 "
            containerProps={{
              className: "min-w-0",
            }}
          />
        </div>

        <div>
          <img
            id="imagepreview"
            className="h-full w-full"
            src={`http://localhost:8000/2606517_5856-1684146254978.jpg`}
            alt="kerupuk"
          />
          <div className="mb-3">
            <label
              htmlFor="formFile"
              className="mb-2 inline-block text-neutral-700 dark:text-neutral-200 font-bold pl-2"
            >
              Default file input example
            </label>
            <input
              onChange={onFileChange}
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-2 border-blue-900 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFile"
            />
            <div className="w-full text-center mt-4">
              <Button
                size="sm"
                color={"blue"}
                onClick={uploadImage}
                disabled={onInput}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
