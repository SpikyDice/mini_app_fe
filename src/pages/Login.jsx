import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

//Import from userSlice
import { loginUser } from "../features/users/userSlice";

function Register() {
  //define navigate
  const navigate = useNavigate();

  //Setup dispatch
  const dispatch = useDispatch();

  //hook for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  //Handler
  const submitButtonHandler = async (userData) => {
    const resultOnLogin = await dispatch(loginUser(userData));
    if (resultOnLogin.success) {
      alert("Login Success, Redirecting to Home Page");
      await new Promise((r) => setTimeout(r, 500));
      navigate(`/home/${resultOnLogin.userData.iduser}`);
    } else {
      alert(resultOnLogin.message);
    }
  };

  //Schema from Yup to be used inside FORMIK!
  const registerSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Password minimum 5 character")
      .required("Please input your password"),
    email: Yup.string()
      .required("Please input your email")
      .email("Wrong email format, Example: john@mail.com"),
  });

  return (
    <div className="w-1/2 mt-20 rounded-xl border-black border-4 mx-auto bg-red-100">
      <Formik
        initialValues={{
          password: "",
          email: "",
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
                      Login To Your Account
                    </h2>
                  </div>
                  <Form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div className="pt-4">
                        <label htmlFor="email-address" className="sr-only">
                          Email Address
                        </label>
                        <Field
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="relative block w-full rounded-t-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Email address"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="pt-4">
                        <div className="flex flex-row justify-around">
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <Field
                            id="password"
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            autoComplete=""
                            required
                            className="relative block w-full rounded-b-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => togglePasswordVisibility()}
                          >
                            {isPasswordVisible ? `Hide` : `Show`}
                          </button>
                        </div>
                        <ErrorMessage
                          component="div"
                          name="password"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="flex flex-row justify-end pt-5">
                        <div
                          className="hover:cursor-pointer tracking-tighter"
                          onClick={() => navigate("/resetpassword")}
                        >
                          Forgot password?
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        LOGIN
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

export default Register;
