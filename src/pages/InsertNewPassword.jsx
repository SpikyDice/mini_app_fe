import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

//importing newPassword function from userSlice
import { sendNewUserPassword } from "../features/users/userSlice";

function InsertNewPassword() {
  //setCountDown when redirecting pages
  const [countDown, setCountDown] = useState();

  //destructuring token from params
  const { token } = useParams();

  //define navigate
  const navigate = useNavigate();

  //Setup dispatch
  const dispatch = useDispatch();

  //onInput setup
  const [onInput, setOnInput] = useState(false);

  //Handler
  const submitButtonHandler = async (newUserPassword) => {
    const { newPassword, confirmPassword } = newUserPassword;
    if (newPassword !== confirmPassword) {
      alert(`Password entered do not match`);
    } else {
      setOnInput(true);
      const resultPasswordChange = await sendNewUserPassword(
        newUserPassword,
        token
      );
      setOnInput(false);
      if (!resultPasswordChange.success) {
        alert(resultPasswordChange.message);
      } else {
        setOnInput(true);
        alert(`${resultPasswordChange.message}, redirecting you to Login Page`);
        await new Promise((r) => setTimeout(r, 200));
        setOnInput(false);
        navigate("/login");
      }
    }
  };

  //hook for password visibility
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  function toggleNewPasswordVisibility() {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  }
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  }

  //Schema from Yup to be used inside FORMIK!
  const registerSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(5, "Password minimum 5 character")
      .required("Please input your email"),
    confirmPassword: Yup.string()
      .min(5, "Password minimum 5 character")
      .required("Please input your email"),
  });
  return (
    <div className="w-1/2 mt-20 rounded-xl border-black border-4 mx-auto bg-yellow-100">
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          submitButtonHandler(values);
        }}
      >
        {(props) => {
          return (
            <>
              <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div>
                    <img
                      className="mx-auto h-12 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Enter Your New Password
                    </h2>
                  </div>
                  <Form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div className="pt-4">
                        <div className="flex flex-row justify-around">
                          <label htmlFor="new-password" className="sr-only">
                            New Password
                          </label>
                          <Field
                            id="new-password"
                            name="newPassword"
                            type={isNewPasswordVisible ? "text" : "password"}
                            autoComplete="newPassword"
                            required
                            className="relative block w-full rounded-t-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="New Password"
                          />
                          <button
                            type="button"
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => toggleNewPasswordVisibility()}
                          >
                            {isNewPasswordVisible ? `Hide` : `Show`}
                          </button>
                        </div>
                        <ErrorMessage
                          component="div"
                          name="newPassword"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="pt-4">
                        <div className="flex flex-row justify-around">
                          <label htmlFor="confirm-password" className="sr-only">
                            Confirm Password
                          </label>
                          <Field
                            id="confirm-password"
                            name="confirmPassword"
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            autoComplete="confirmPassword"
                            required
                            className="relative block w-full rounded-t-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Confirm Password"
                          />
                          <button
                            type="button"
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => toggleConfirmPasswordVisibility()}
                          >
                            {isConfirmPasswordVisible ? `Hide` : `Show`}
                          </button>
                        </div>
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        disabled={onInput}
                        type="submit"
                        className="group disabled:bg-gray-600 relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export default InsertNewPassword;
