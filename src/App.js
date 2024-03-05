import React from "react";
import Layout from "./components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Dashheader from './components/Dashheader/Dashheader';
import Homee from './pages/Homee';
import { useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const isAuthenticated = localStorage.getItem('adminlogin');
  const users = JSON.parse(isAuthenticated);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { pathname } = useLocation();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <Layout />
      
      {isAuthenticated ? (
        pathname === '/dashboard' ? (
          <div className="grid-container">
            <Dashheader OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Dashboard />
            <Homee />
          </div>
        ) : (
          <div className="grid-container">
           
           
          </div>
        )
      ) : null}

      <ToastContainer />
    </>
  );
}

export default App;
