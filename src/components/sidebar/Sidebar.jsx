import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsEscape, BsFillGearFill}
 from 'react-icons/bs'
 import "../../styles/sidebar.css";
 import { Link, useNavigate } from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from local storage
        localStorage.setItem("adminlogin",false );
        localStorage.removeItem('adminlogin');
        // Redirect to the login page or any other page after logout
        navigate('/adminlogin');
      };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand' style={{color:'white'}}>
                 YECHEEZ PIZZA'S
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/dashboard/myorder" >
                <a href="">
                    <BsCart3 className='icon'/> Order
                </a>
                </Link>
            </li>
            <li className='sidebar-list-item'>
               
                <a href="">
                    <BsPeopleFill className='icon'/> User Management
                </a>
                
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsEscape  className='icon'/> <button className='logoutbtn' onClick={handleLogout}>Logout</button> 
                    
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar