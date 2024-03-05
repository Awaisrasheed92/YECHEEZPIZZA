import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Profile = () => {
  const initialUserData = {
    email: '',
    password: '',
    // Add other fields as needed
  };
  const [userlogin, setuserlogin] = useState(initialUserData);
  const navigate = useNavigate();

  useEffect(() => {
    // Save the updated user data in local storage
    localStorage.setItem('userData', JSON.stringify(userlogin));
  }, [userlogin]);

  const handleUpdateProfile = () => {
    // Retrieve user data from local storage
    const storedData = JSON.parse(localStorage.getItem('users'));

    if (storedData) {
      // Find the user with the matching email
      const updatedUser = storedData.find((user) => user.email === userlogin.email);

      if (updatedUser) {
        // Update the user's password
        updatedUser.password = userlogin.password;

        // Update the local storage with the modified data
        localStorage.setItem('users', JSON.stringify(storedData));

        // Show a success message
        toast.success('Profile updated successfully!', {
          position: 'top-right',
        });
        navigate('/home');
      } else {
        toast.warning('User not found!');
      }
    } else {
      toast.error('No users in local storage!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuserlogin((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className='container'>
      <Form>
        <h1>Profile Page</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={userlogin.email} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userlogin.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default Profile;
