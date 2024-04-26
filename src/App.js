import { Container, Row, Col, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PhoneSignup from "./components/PhoneSignup";
import RegistrationForm from "./components/RegistrationForm";
import ChatPage from "./components/ChatPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewChat from "./components/ViewChat";


function App() {
  return (
    
    <Router>
      
      <Container style={{ width: "" }}>
      
        <Row>
          <Col>
            <UserAuthContextProvider>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/phonesignup" element={<PhoneSignup/>} />
                <Route path="/registrationform" element={<RegistrationForm/>}/>
                <Route path="/navbar" element={<Navbar/>}/>
                <Route path="/chatpage" element={<ChatPage/>}/>
                <Route path="viewchat" element={<ViewChat/>}/>
                
              </Routes>
            </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
      
    </Router>
    

  );
}

export default App;
