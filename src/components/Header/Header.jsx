import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from "react-icons/fa6";
import "../../styles/header.css";
import { useLocation } from "react-router-dom";


const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const {pathname } = useLocation()
  const isAuthenticated = localStorage.getItem('userlogin');

  const users=JSON.parse(isAuthenticated);


  const navigate = useNavigate();
 
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartTotalItem = useSelector((state) => state.cart.cartItems?.length);
  console.log(totalQuantity)
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };



  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };
  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.setItem("isLogin",false );
    localStorage.removeItem('userlogin');
    // Redirect to the login page or any other page after logout
    navigate('/login');
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);


 
  return (
    <>
    {pathname !== '/dashboard' && (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="text-logo">
            <Link to="./home">
              <h5>YECHEEZ PIZZAS</h5>
            </Link>
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{cartTotalItem}</span>
            </span>
            </div>
            <div className="usericon">
      <NavDropdown title={users ? users.email : 'users'}>
        {isAuthenticated ? (
          <>
            <NavDropdown.Item>
              <Link to="/yourprofile">Your Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/myorders">My Orders</Link>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <Link to="/adminlogin">Dashboard</Link>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </>
        ) : (
          <NavDropdown.Item>
            <Link to="./login">Login</Link>
          </NavDropdown.Item>
        )}
      </NavDropdown>
    </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
       
      </Container>
    </header>
   
    )}
     </>
  );
};

export default Header;
