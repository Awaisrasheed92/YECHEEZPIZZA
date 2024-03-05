// Inside Userinfo.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';

const MyOrders = () => {
  const  {orders} = useSelector((state) => state.Userorder);
  const  {cartItems, totalAmount} = useSelector((state) => state.Userorder);
  const isAuthenticated = localStorage.getItem('userlogin');
  const users=JSON.parse(isAuthenticated);
  const myOrders =  orders.filter((user)=>
  {
    return user.email === users.email
  })


  return (
    <div>
          <h1>my orders</h1>

      <Table striped>       
       <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>OrderId</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Total cart items</th>
            <th>total bill</th>
            <th>delivery status</th>
          </tr>
        </thead>
        <tbody>
          
          
          {myOrders?.map((item,index)=>
          (
            <tr>
            <th scope="row">1</th>
            <td>{item?.email}</td>
            <td>{item?.orderId}</td>
            <td>{item?.name}</td>
            <td>{item?.phone}</td>
            <td>{item?.cart?.length}</td>
            <td>{item?.totalAmount}</td>
            <td>{item?.status || 'Not Delivered'}</td>

          </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default MyOrders;
