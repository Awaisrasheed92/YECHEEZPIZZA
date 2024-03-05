import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useDispatch } from "react-redux";
import {addOrderIntoOrders, setUserorder } from "../store/shopping-cart/UserorderSlice";
import { useEffect } from "react";

import "../styles/checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const shippingCost = 30;
  const isAuthenticated = localStorage.getItem('userlogin');
  const users=JSON.parse(isAuthenticated);
  function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}
  const submitHandler = (e) => {
    e.preventDefault();
    const genrateOrderId = generateRandomNumber()
      
    const userOrderData = {
      orderId:genrateOrderId,
      totalAmount: totalAmount,
      name: enterName,
      email: users.email,
      phone: enterNumber, 
      shippingInfo: {
        country: enterCountry,
        city: enterCity,
        postalCode: postalCode,
      },
        cart: cartItems,      
    };
    
    dispatch(addOrderIntoOrders(userOrderData))
  };

  useEffect(() => {
    // You can optionally perform any actions after the shipping address is set,
    // such as navigating to another page or displaying a success message.
  }, [cartItems, totalQuantity, totalAmount]);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                  {/* <div className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      onChange={(e) => setEnterEmail(e.target.value)}
                    />
                  </div> */}
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Postal code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <button  type="submit" className="addTOCart__btn">
                  Place Order
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


export default Checkout;
