import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

//importing reset password function
import { resetPassword } from "../features/users/userSlice";

function ResetPassword() {
  //define navigate
  const navigate = useNavigate();

  //Setup dispatch
  const dispatch = useDispatch();

  //Handler
  const submitButtonHandler = async (userEmail) => {
    const emailStatus = await resetPassword(userEmail);
    if (!emailStatus.success) {
      alert(emailStatus.message);
    } else {
      await new Promise((r) => setTimeout(r, 200));
      alert(emailStatus.message);
      //   navigate(`/insertnewpassword/${token}`);
    }
  };

  //Schema from Yup to be used inside FORMIK!
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please input your email")
      .email("Wrong email format, Example: john@mail.com"),
  });
  return (
    <div className="w-1/2 mt-20 rounded-xl border-black border-4 mx-auto bg-green-100">
      <Formik
        initialValues={{
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
                      Reset Password
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
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default ResetPassword;
