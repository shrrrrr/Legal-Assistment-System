import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChatListPopup from './ChatListPopup';
import ReactDOM from 'react-dom';


import I5 from '../../src/images/I5.png';




const ChatPage = () => {

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [serverResponse, setServerResponse] = useState('');
  const [showChats, setShowChats] = useState(false); 
  const [chatId, setChatId] = useState('');


  //let temp_token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMmI0MiIsImlhdCI6MTcxNDEyOTI5OSwiZXhwIjoxNzE0MTMwNzM5fQ.P-GoPv7IiXS66_FPip0EoDWZLzUca1yfywFDpkM1gQE'

  useEffect(() => {
    // Initialize local storage
    const storedChatId = localStorage.getItem('chatId');
    if (storedChatId) {
      setChatId(storedChatId);
    }
  }, []);

  const token = localStorage.getItem('token'); // Retrieve token from local storage

  const sendMessage = async () => {
    console.log(chatId);
    console.log(token);
    
    try {
      const response = await axios.post(

        //`http://localhost:8080/${chatId}/chat`
        

        `http://localhost:8080/${chatId}/chat`, // Update endpoint
      
        { message },
        {
          headers: {
            Authourization: `Bearer ${token}`,
           // Authorization: `Bearer ${token}`,
          },
        }
      
      );
      
      if (response.status === 200) {
      //  setServerResponse(response.data[0].response);
      
      console.log(response.data.queries[1].response);
        setChatHistory([...chatHistory, { message }]);
       
       setMessage('');
        setServerResponse(response.data.queries[1].response);
    
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  {/* 

  const fetchAllChats = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getChats', {
        headers: {
          Authourization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const chatHistoryData = response.data.map(chat => {
          // Map over queries in each chat and extract response property
          const responses = chat.queries.map(query => query.response);
          return responses;
        });
  
        console.log(chatHistoryData);
        setChatHistory(chatHistoryData);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

*/}

const fetchAllChats = async () => {
  try {
    const response = await axios.get('http://localhost:8080/getChats', {
      headers: {
        Authourization: `Bearer ${token}`, // Corrected misspelling of Authorization
      },
    });
    if (response.status === 200) {
      const chatHistoryData = {}; // Initialize an empty object to store chat messages

      response.data.forEach(chat => {
        const { _id: chatId, queries } = chat; // Extract chat ID and queries array
        const messages = queries.map(query => ({
          message: query.msg,
          response: query.response,
        }));

        // Store the messages array in the chatHistoryData object under the chat ID
        chatHistoryData[chatId] = messages;
      });

      console.log(chatHistoryData);

      for (const id in chatHistoryData) {
        console.log(id);
        // Iterate through each message-response pair for the current ID
        chatHistoryData[id].forEach(pair => {
          console.log("Message:", pair.message);
          console.log("Response:", pair.response);
        });
      }
      display_All_Chat(chatHistoryData);

      // i will display_all_chat function by passing chatHistory object
     
      // Now chatHistoryData contains the mapping between chat IDs and messages
      // You can use this data as needed, such as setting it in state
    }
  } catch (error) {
    console.error('Error fetching chats:', error);
  }
};



  const startNewChat = async () => {
    try {
      const newChatData = {
        "_id": 813193,
        "queries": [
          {
            "msg": "test",
            "response": "yes"
          }
        ],
        "title": "helllo!",
        "username":"soham"
      };

      const response = await axios.post('http://localhost:8080/createChat', newChatData, {
        headers: {
          Authourization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        const { _id } = response.data;
        setChatHistory([]);
        localStorage.setItem('chatId', _id);
        console.log(chatId);
        setChatId(_id);
      }
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

       const display_All_Chat=(responseData)=>{

        const contentContainer = document.getElementById('content');

        // Iterate through each ID
        for (const id in responseData) {
          const idHeader = document.createElement('h2');
          idHeader.textContent = id;
          contentContainer.appendChild(idHeader);
      
          // Check if responseData[id] is an array
          if (Array.isArray(responseData[id])) {
            // Iterate through each message-response pair for the current ID
            responseData[id].forEach(pair => {
              const messageParagraph = document.createElement('p');
              const responseParagraph = document.createElement('p');
      
              messageParagraph.classList.add('message');
              messageParagraph.textContent = "Message: " + pair.message;
      
              responseParagraph.textContent = "Response: " + pair.response;
      
              contentContainer.appendChild(messageParagraph);
              contentContainer.appendChild(responseParagraph);
            });
          } else {
            // If responseData[id] is not an array, just display a message
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "No chats available for ID: " + id;
            contentContainer.appendChild(errorMessage);
          }
        }

       }

       const clear_chat_display=()=>{
        const contentContainer = document.getElementById('content');
        contentContainer.innerHTML = ''; // Clear content

       }

    const toggleChatHistory = () => {
      setShowChats(!showChats);
    }
    

    useEffect(() => {
      console.log("Chat History:", chatHistory);
    }, [chatHistory]);
    



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


<div className='parent' style={{ backgroundColor: "grey", padding: '20px', minHeight: '500px', position: 'relative' }}>
  <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
    Legal Assist: Hello there! How Can i help you today?
  </div>
  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {chatHistory.map((chat, index) => (
      <div key={index} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
        You: {chat.message}
      </div>
    ))}
    {serverResponse && (
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
        Legal Assist: {serverResponse}
      </div>
    )}
  </div>
  <div style={{ position: 'absolute', bottom: '10px', left: '20px', right: '20px' }}>
    <input
      type="text"
      className="form-control"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button className="btn btn-primary mt-2" onClick={sendMessage}>Send</button>
    <button className="btn btn-secondary mt-2" onClick={startNewChat} style={{ marginLeft: '10px' }}>New Chat</button>
    <button className="btn btn-secondary mt-2" onClick={fetchAllChats} style={{ marginLeft: '10px' }}>View All Chats</button>
    <button className="btn btn-secondary mt-2" onClick={clear_chat_display} style={{ marginLeft: '10px' }}>Hide all Chats</button>
  </div>

 
</div>


<div className="container" id="content" style={{
    backgroundColor: "whitesmoke",
    color: "black",
    fontSize: "x-large",
}}>


</div>








    </>
  
  );
};

export default ChatPage;
