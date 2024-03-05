import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/signIn.css";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import {  toast } from "react-toastify";

import axios from "axios";

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
  const [token, setToken_] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values) => {

    
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const response = await axios.post("http://localhost:4000/api/v1/auth/login", values);
      console.log(response);

    
      const userData = response.data.data
      console.log('user data of backen', userData)
      
      if(response.data.success === true){
        toast.success(response.data.message)

        const token = response.data.token; 
        localStorage.setItem("jwt", token);
        setToken_(token);
      }

      navigate("/home");
      
      localStorage.setItem("users", JSON.stringify(userData));
    

    } catch (error) {
      // Handle errors (show an error toast or handle the error in another way)
      console.error("Error during sign up:", error.message);
    }
    
  };



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
    // onSubmit: (values) => {
    //   // Retrieve user data from local storage

      
     
    // },
    onSubmit: onSubmit,
    validationSchema: signUpSchema,
  });
  return (
    <>
      <div className="container">
      <Container>
        <form className="form" onSubmit={handleSubmit}>
          <div className="outer-handler">
            <label className="names"  style={{color:'#1c1c1b'}}>Email</label>
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
            <label className="names"  style={{color:'#1c1c1b'}}>Password</label>
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
            {/* <img
              src={hide}
              alt="Hide Password"
              className="hide-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            /> */}
            {touched.email && errors.email && (
              <div className="errorMessages">{errors.password}</div>
            )}
          </div>
          <button className="signInbutton" onSubmit={handleSubmit}>
            SignIn
          </button>
          <div className="signUp-text">
          <p> Already have an account?<Link to="/signup">Sign up</Link></p>
          </div>
        </form>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
