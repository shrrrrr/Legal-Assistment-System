import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import v2 from '../../src/video/v2.mp4';
import '../../src/css/signuppage.css'

import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [islawyer,setLawyer]=useState(false);
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>

<div className="video-container">
        <video className='videoTag' autoPlay loop muted>
          <source src={v2} type='video/mp4' />
        </video>
      </div>











      <div className="content-container">

      <div className="p-4 box">
        <h2 className="mb-3">Signup with Email</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width:'40%'
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width:'40%'
              }}
              
            />

             <div className="mb-3 form-check">
             <label className="form-check-label" htmlFor="exampleCheck1">Are you lawyer ?</label>
                            <input type="checkbox" className="form-check-input" id="yes" />
                            <input type="checkbox" className="form-check-input" id="no" />
                            
                        </div>

            
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" style={{width:'35%'}}>
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      </div>
    </>
  );
};

export default Signup;
