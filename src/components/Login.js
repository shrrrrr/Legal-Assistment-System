import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import PhoneSignup from "./PhoneSignup";

import '../../src/css/loginpage.css'
import v1 from '../../src/video/v1.mp4';
import image1 from '../../src/images/a2.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        {
          firstName: email,
          lastName: 'k4',
          email: email,
          password: password,
        }
      );
      const { token } = response.data;
      console.log(token);
      localStorage.setItem('token', token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
   
   <>
    <div className="video-container">
        <video className='videoTag' autoPlay loop muted>
          <source src={v1} type='video/mp4' />
        </video>
      </div>


   
      <div className="content-container">

            <div className="loginnavbar">
              <div className="left" style={{
                color:'white'
              }}>
                  <img src={image1} alt="Image not found" style={{ maxWidth: '15%', height: 'auto' }} />
                

              </div>
              <div className="right"
              style={{
                color:'white'
              }}
              >
                

              </div>
            </div>
       
      <h1 style={{
  color: 'white',
  paddingTop: '108px'
}}>Empower Your Legal Journey...</h1>

<div className="p-10 box">

  

  
  <h2 className="mb-3" style={{color: 'white',paddingTop:'30px'}}   >Log in </h2>

  {error && <Alert variant="danger">{error}</Alert>}
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control
        type="email"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: 'auto' }}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: 'auto' }}
      />

      
      
    </Form.Group>

    <div className="d-grid gap-2">
      <Button variant="primary" type="submit" style={{ width: 'fit-content',color: 'white' }}>
        Log In
      </Button>
    </div>
  </Form>
  <hr />
  <div>
    <GoogleButton
      className="g-btn"
      type="dark"
      onClick={handleGoogleSignIn}
    />
  </div>
  
  <Link to="/phonesignup">
    <div className="d-grid gap-2 mt-3">
      <Button variant="success" type="submit" style={{ width: '18%' }}>
        Sign in with Phone 
      </Button>
    </div>
  </Link>
</div>


      
      <div className="p-4 box mt-3 text-center" style={{
        color:'white',
        fontSize:'large'
      }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      </div>
      
    </>
  );
};

export default Login;
