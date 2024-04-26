import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";

import v2 from '../../src/video/v2.mp4';
import '../../src/css/signuppage.css'
import axios from 'axios';

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const[name,setName]=useState("")
  const { setUpRecaptha } = useUserAuth();
  const { PhoneSignUp } = useUserAuth();

  const navigate = useNavigate();
 

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);

    setError("");
   
    
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    }catch (err) {
      console.log("here");
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      // If OTP verification is successful, make the registration request
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        {
          firstName: name,
          lastName: 'k4',
          email: name,
          password: number,
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
  

  useEffect(() => {
    localStorage.setItem('userName', name);
  }, [name]);

  return (
    <>


<div className="video-container">
        <video className='videoTag' autoPlay loop muted>
          <source src={v2} type='video/mp4' />
        </video>
      </div>

      <div className="content-container">
      <div className="p-4 box">

        <h2 className="mb-3">Phone Number Authentication </h2>

        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
    <label htmlFor="namebox">Name:</label>
       <div className="namebox"
    style={{
      marginLeft:'0px',
      paddingBottom:'50px',
      width:'40%'
    }}
    >
        <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
              style={{width:'30%'}}
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Send Otp
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              style={{width:'30%'}}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>
      </div>
      </div>
    </>
  );
};

export default PhoneSignUp;
