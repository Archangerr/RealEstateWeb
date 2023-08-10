import { Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import EmlakListing from './components/EmlakListing/EmlakListing';
import EmlakListingPagination from './components/EmlakListing/EmlakListingPagination';
import React, { useState } from 'react';
import Navbar from './components/NavbarV2/NavbarV2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  

  return (
    <div className="wrapper">
      
       <h1>EmlakOtomasyon</h1> 
      
       <BrowserRouter>
       <Navbar />
         <Routes>
          <Route path="/EmlakListing" element={<EmlakListing />} />
          <Route path="*" element={<Navigate to="/EmlakListing" replace />} />  
          <Route path="/EmlakListingPagination" element={<EmlakListingPagination/>}/>
         </Routes>
       </BrowserRouter>
     
    </div>
  );
}

export default App;
