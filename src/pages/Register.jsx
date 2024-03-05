import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "reactstrap";
import "../styles/signUp.css";
import hide from "../assets/images/hide.jpeg";
import axios from "axios";



const signUpSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required.")
    .matches(/^[A-Za-z]/, "First name can only include letters."),
  email: yup
    .string()
    .email()
    .required(
      "Hold on! Something may be missing. It should look something like this “johndoe@gmail.com”"
    ),
  password: yup
    .string()
    .min(5)
    .required(
      "Password must include at least one alphabet, one number, and one special character"
    )
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include at least one alphabet, one number, and one special character"
    ),
});

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      // Simulating an asynchronous API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Actual API call with Axios
      const response = await axios.post("http://localhost:4000/api/v1/auth/signup", values);
      console.log(response);
  
      // Handle the response from the server (you might want to check if the sign-up was successful)
  
      // Update the local storage
      localStorage.setItem("users", JSON.stringify(values));
  
      // Show success toast
      toast.success("Congratulations, Sign up successful!");
      localStorage.setItem("isLogin",false );
    
      console.log(response);
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      // Handle errors (show an error toast or handle the error in another way)
      console.error("Error during sign up:", error.message);
    }
    
  };
  

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
    onSubmit: onSubmit,
    validationSchema: signUpSchema,
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    // <Helmet title="Signup">
    //   <CommonSection title="Signup" />
     
        <Container>
          
          <form className="form" onSubmit={handleSubmit}>
              <div className="outer-handler">
            <label className="names" style={{color:'#1c1c1b'}}>First Name</label>
            <input
              className={`namesInput  ${
                touched.firstName && errors.firstName ? "errorInputColor" : ""
              }`}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              onBlur={() => setFieldTouched("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <div className="errorMessages">{errors.firstName}</div>
            )}
          </div>

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

            <img
              src={hide}
              alt="Hide Password"
              className="hide-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
            {touched.password && errors.password && (
              <div className="errorMessages">{errors.password}</div>
            )}
          </div>

          {/* <div className="outer-handler">
            <label className="names" style={{color:'#1c1c1b'}}>Comfirm Password</label>
            <input
              className={`namesInput  ${
                touched.confirmPassword && errors.confirmPassword
                  ? "errorInputColor"
                  : ""
              }`}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="**********"
              onChange={handleChange}
              onBlur={() => setFieldTouched("confirmPassword")}
              value={values.confirmPassword}
            />
            <img
              src={hide}
              alt="Hide Password"
              className="hide-password-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="errorMessages">{errors.confirmPassword}</div>
            )}
          </div> */}
                  <button type="submit" className="signUpbutton">
                    Sign Up
                  </button>
                  <br/>
                  <p> Already have an account?<Link to="/login"> Login</Link></p>
                </form>
       
        </Container>
       
      
    // </Helmet>
    
  );
};

export default SignUp;
