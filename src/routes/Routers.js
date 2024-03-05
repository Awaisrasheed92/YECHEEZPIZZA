import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Adminlogin from "../pages/Adminlogin";
import Myorder from "../pages/Myorder";
import MyOrders from "../pages/myOrders";
import AuthGuard from "../guards/AuthGuard";
import PrivateRoute from "../guards/Privateroute";

const Routers = () => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
      <Route path="/home" element={<Home />}  />

      </Route>

      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/adminlogin" element={<Adminlogin />} />
      <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} />
      <Route path="/checkout" element={<PrivateRoute component={<Checkout />} />} />
      <Route path="/myorders" element={<PrivateRoute component={<MyOrders />} />} />
      <Route path="/dashboard/myorder" element={<PrivateRoute component={<Myorder />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/yourprofile" element={<PrivateRoute component={<Profile />} />} />
    </Routes>
  );
};

export default Routers;





// import React from "react";
// import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
// import Protected from "../pages/ProtectedGuard";
// import Home from "../pages/Home";
// import AllFoods from "../pages/AllFoods";
// import FoodDetails from "../pages/FoodDetails";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Contact from "../pages/Contact";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Profile from "../pages/Profile";
// import ProtectedRoute from "../pages/ProtectedGuard";
// import Dashboard from "../pages/Dashboard";
// import Adminlogin from "../pages/Adminlogin";
// import Myorder from "../pages/Myorder";
// import MyOrders from "../pages/myOrders";


// const Routers = () => {
//   return (
    
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/foods" element={<AllFoods />} />
//         <Route path="/foods/:id" element={<FoodDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/adminlogin" element={<Adminlogin/>}/>

//         <Route path="/dashboard" element={
        
//         <ProtectedRoute>
//         <Dashboard />
//         </ProtectedRoute>
//         } />

//         <Route path="/checkout" element={
//         <ProtectedRoute>
//         <Checkout />
//         </ProtectedRoute>
        
//         } />
//         <Route path="/myorders" element={
//         <ProtectedRoute>
//         <MyOrders />
//         </ProtectedRoute>
        
//         } />

// <Route path="/dashboard/myorder" element={
//         <ProtectedRoute>
//         <Myorder />
//         </ProtectedRoute>
        
//         } />


//         <Route path="/login" element={<Login />} />



//         <Route path="/signup" element={<Register />} />
//         <Route path="/contact" element={<Contact />} />
        
//         <Route path="/yourprofile" element={  
//         <ProtectedRoute>
//         <Profile/>
//         </ProtectedRoute>} />
        
        
//       </Routes>
    
//   );
// };

// export default Routers;
