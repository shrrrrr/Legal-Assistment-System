
import React, { useState,useEffect,setText } from "react";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import RegistrationForm from "./RegistrationForm";
import '../../src/css/homepage.css'
import customNavbar from './customNavbar'
import ChatPage from "./ChatPage";

import axios from 'axios';

import a3 from '../../src/images/a2.png';

import a4 from '../../src/images/a4.jpg'
import a5 from '../../src/images/a5.jpg'
import I5 from '../../src/images/I5.png'
const Home = () => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRegistrationForm=async()=>{
    console.log("regitratin button clicked");
    try{
          navigate("/registrationform")
    }catch(err){
      console.log(err)
    }
  };
  return (
    <>



    
    
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/home">
      
    <img src={I5} alt="Image not found" style={{ maxWidth: '15%', height: 'auto' }} />
      <p>Legal Assist</p>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/registrationform">
            Registration
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Chatbot
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/chatpage">
                Chat With Us
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/viewchat">
                View chat History
              </a>
            </li>
            
          </ul>
        </li>
        
      </ul>
      <form className="d-flex" role="search" action="https://www.google.com/search" method="get" target="_blank">
    <input
        className="form-control me-2"
        type="search"
        name="q" // Name attribute for the search query parameter
        placeholder="Search on Google"
        aria-label="Search"
    />
    <button className="btn btn-outline-success" type="submit">
        Search
    </button>
</form>

    </div>
  </div>
</nav>


<div className="d-grid gap-2"

style={{
  width:'20%'
}}

>
        <Button variant="primary" onClick={handleRegistrationForm}>Complete Registration</Button>
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
  


      <div className="p-4 box mt-3 text-center" style={{ fontSize: '24px', backgroundColor: 'skyblue' }}>
    Hello {name}
    {user && user.email}
</div>




<div className="midpart" style={{marginTop:"60px",     justifyContent:"space-evenly"}}>


<div className="card" style={{ width: "18rem" }}>
  <img src={a3} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Chat With Us...</h5>
    <p className="card-text">
      Uncover insightful judgement with our Chatbot...
    </p>
    <a href="/chatpage" className="btn btn-primary">
      ChatPage
    </a>
  </div>
</div>
<div className="card" style={{ width: "18rem" }}>
  <img src={a4} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Case research</h5>
    <p className="card-text">
      AI powered contextual search...
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>

<div className="card" style={{ width: "18rem" }}>
  <img src={a5} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">View Chat History</h5>
    <p className="card-text">
    Go through the Chat History
    </p>
    <a href="/viewchat" className="btn btn-primary">
      Chat History
    </a>
  </div>
</div>













</div>



  
  

    
    
     
  
    </>
  );
};

export default Home;
