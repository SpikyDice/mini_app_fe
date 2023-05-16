import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tokenVerification } from "../features/users/userSlice";

function Verification() {
  //define navigate hooks
  const navigate = useNavigate();

  //destructuring the token received
  const { token } = useParams();

  const userTokenVerification = async (token) => {
    const response = await tokenVerification(token);
    console.log(response);
    if (response.data.success) {
      await new Promise((r) => setTimeout(r, 500));
      alert(response.data.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    userTokenVerification(token);
  }, []);
  return <div>This is verification page</div>;
}

export default Verification;
