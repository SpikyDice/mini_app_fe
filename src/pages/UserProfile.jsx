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
  //onsubmit event
  const [isSubmit, setIsSubmit] = useState(false);

  //define navigate
  const navigate = useNavigate();

  //define dispatch
  const dispatch = useDispatch();

  //get id from global state of user
  const { user } = useSelector((state) => state.user);
  const { iduser } = user;
  const data = useSelector((state) => state.user.dataChange);

  //get user_image_profile from db
  const { profile } = user;

  //get id user from param
  const { id } = useParams();

  //set Image file for preview
  const [file, setFile] = useState(null);

  //event handler when user upload image file
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  //button upload image handler
  const uploadImage = async () => {
    if (file) {
      const obj = {
        id: iduser,
        fullname,
        biography,
        username,
      };

      let formData = new FormData();
      formData.append(`file`, file);
      formData.append(`data`, JSON.stringify(obj));

      const response = await Axios.post(
        "http://localhost:8000/upload",
        formData
      );

      if (!response.data.success) {
        alert(response.data.message);
      }

      if (response.data.success) {
        dispatch(loggedInUser(response.data.data));
        dispatch(setDataChange());
        // window.location.reload(false);
      }
    } else {
      alert("Select image first");
    }
  };

  //edit fullname handler
  const [editFullName, setEditFullName] = useState(false);
  const [fullname, setFullName] = useState("");
  const onEditFullNameHandler = () => setEditFullName(!editFullName);
  const onSetFullName = (event) => setFullName(event.target.value);

  //edit Biography handler
  const [editBiography, setEditBiography] = useState(false);
  const [biography, setBiography] = useState("");
  const onEditBiographyHandler = () => setEditBiography(!editBiography);
  const onSetBiograpy = (event) => setBiography(event.target.value);

  //edit Username handler
  const [editUsername, setEditUsername] = useState(false);
  const [username, setUsername] = useState("");
  const onEditUsernameHandler = () => setEditUsername(!editUsername);
  const onSetUsername = (event) => setUsername(event.target.value);

  //get usertoken from localstorage
  const userToken = localStorage.getItem(`user_token`);

  //dispatch await check login
  const dispatchCheckLogin = async (token) => {
    await dispatch(checkLogin(token));
  };

  // below useEffect is not going to work, I think because of the callstack problem, which useeffect is running first App or Home? If app useEffect is running first then global state will still be available prior to calling this useEffect, but it looks like this useEffect is running first instead, so if we refresh the page and make the global state empty, after that execute App useEffect to fill the global state
  useEffect(() => {
    if (user.iduser) {
      setFullName(user.profile.fullname);
      setBiography(user.profile.bio);
      setUsername(user.username);
      // dispatch(resetDataChange());
    }
    console.log(user);
  }, [user]);

  return (
    <div className="flex flex-row justify-center mt-20">
      <div className="relative flex flex-col gap-5 w-full max-w-[24rem]">
        <div className="font-bold">EMAIL : {user.email}</div>
        <div>
          <Typography variant="h6" className="pl-2">
            Full Name
          </Typography>
          <Input
            type="text"
            label="Full Name"
            value={fullname}
            onChange={onSetFullName}
            //   onChange={onChange}
            className="pr-20 "
            disabled={editFullName}
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={editFullName ? "blue-gray" : "blue"}
            onClick={onEditFullNameHandler}
            className="!absolute right-1 top-7  rounded"
          >
            Edit
          </Button>
        </div>

        <div className="relative">
          <Typography variant="h6" className="pl-2">
            Biography
          </Typography>
          <Textarea
            type="textarea"
            label="Biography"
            value={biography}
            onChange={onSetBiograpy}
            //   onChange={onChange}
            className="pr-20 "
            disabled={editBiography}
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={editBiography ? "blue-gray" : "blue"}
            onClick={onEditBiographyHandler}
            className="!absolute right-1 top-7 rounded"
          >
            Edit
          </Button>
        </div>

        <div className="relative">
          <Typography variant="h6" className="pl-2">
            Username
          </Typography>
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={onSetUsername}
            //   onChange={onChange}
            className="pr-20 "
            disabled={editUsername}
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={editUsername ? "blue-gray" : "blue"}
            onClick={onEditUsernameHandler}
            className="!absolute right-1 top-7 rounded"
          >
            Edit
          </Button>
        </div>

        <div>
          <img
            id="imagepreview"
            className="h-full w-full"
            // src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            src={`http://localhost:8000/2606517_5856-1684146254978.jpg`}
            alt="nature image"
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
              <Button size="sm" color={"blue"} onClick={uploadImage}>
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
