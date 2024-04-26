import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import I5 from '../../src/images/I5.png';

import axios from 'axios';
const RegistrationForm = () => {
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [lawyerRegistrationNumber,setlawyerRegistrationNumber]=useState(0);
    const [practiseArea,setpractiseArea]=useState("");
    const [organization,setorganization]=useState("");
    const [location,setlocation]=useState("");
    const [yearsOfExperience,setyearsOfExperience]=useState("");
    const [language,setlanguage]=useState("");
  
  
      const navigate=useNavigate();
      const handleSubmit=(e)=>{
          e.preventDefault(); 
          console.log("here");
          navigate("/home");
          axios.post('http://localhost:4000/register',{name,email,lawyerRegistrationNumber,practiseArea,organization,location,yearsOfExperience,language})
          .then(result=>{
            console.log(result);
            alert("Registration successfull!")
            window.alert("Successfull!");
          }).catch(err=>{
            console.log(err);
          })
      }
      const handleback=(e)=>{
          navigate("/home")
  
      }
      const handlenext=(e)=>{
          navigate("/home");
      }
  
  return (


   <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid"
  style={{
          backgroundColor: "currentcolor",
    borderRadius: "22px"
  }}
  
  >
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
          <a className="nav-link active" aria-current="page" href="/home" 
          
          style={{
                color: "aliceblue",
                fontSize: "larger"
          }}>
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/registrationform"
           style={{
            color: "aliceblue",
            fontSize: "larger"
      }}
          
          >
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

            style={{
                color: "aliceblue",
                fontSize: "larger"
          }}
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



        <div className="container" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
                Registration Form
            </h1>
            <nav className='navbar' style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                <button className="btn btn-secondary" style={{ marginRight: '10px' }}>Back</button>
                <button className="btn btn-secondary">Skip</button>
            </nav>
            <div className='background p-5 rounded' style={{ 
                background: '#FFFFFF', 
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px'
            }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputRegNo" className="form-label">Lawyer Registration Number</label>
                            <input type="text" className="form-control" id="exampleInputRegNo" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPracticeAreas" className="form-label">Practice Areas</label>
                            <input type="text" className="form-control" id="exampleInputPracticeAreas" required />
                        </div>
                    </form>
                </div>
                <div style={{ flex: 1 }}>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputFirm" className="form-label">Law Firm/Organization</label>
                            <input type="text" className="form-control" id="exampleInputFirm" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputLocation" className="form-label">Location</label>
                            <input type="text" className="form-control" id="exampleInputLocation" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputExp" className="form-label">Years of Experience</label>
                            <input type="number" className="form-control" id="exampleInputExp" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputLang" className="form-label">Preferred Languages</label>
                            <input type="text" className="form-control" id="exampleInputLang" required />
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>

                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>


    
 


)
}

export default RegistrationForm;
