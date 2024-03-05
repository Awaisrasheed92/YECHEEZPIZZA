import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/signIn.css";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import {  toast } from "react-toastify";

const signUpSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(
      "Email is required"
      ),
      password: yup.string().min(5).required("Password not correct."),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // Retrieve user data from local storage

      
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      if (storedUsers) {
        const verifyEmail = storedUsers.email === values.email;
        const verifyPassword = storedUsers.password === values.password;
        if (verifyEmail && verifyPassword  ) {
          let data = {
            email:storedUsers.email,
            password:storedUsers.password,
          }

          // Log in successful
          localStorage.setItem("adminlogin", JSON.stringify(data));
          localStorage.setItem("isLogin",true );
          toast.success("Successfully Login !");
          navigate("/dashboard");
        } else {
          toast.warning("Email/password not correct !");
        }
      } else {
        toast.error("User not found!");
      }
    },
    validationSchema: signUpSchema,
  });
  return (
    <>
      <div className="container">
      <Container>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          <div className="outer-handler">
            <label className="names" style={{color:'#1c1c1b'}}>Email</label>
            <input
              className={`namesInput  ${
                touched.email && errors.email ? "errorInputColor" : ""
              }`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onBlur={() => setFieldTouched("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <div className="errorMessages">{errors.email}</div>
            )}
          </div>
          <div className="outer-handler">
            <label className="names" style={{color:'#1c1c1b'}}>Password</label>
            <input
              className={`namesInput  ${
                touched.password && errors.password ? "errorInputColor" : ""
              }`}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="**********"
              onChange={handleChange}
              onBlur={() => setFieldTouched("password")}
              value={values.password}
            />
           
            {touched.email && errors.email && (
              <div className="errorMessages">{errors.password}</div>
            )}
          </div>
          <button className="signInbutton" onSubmit={handleSubmit}>
            SignIn
          </button>
         
        </form>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
