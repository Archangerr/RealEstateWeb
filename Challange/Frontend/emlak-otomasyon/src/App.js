import { Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import EmlakListing from './components/EmlakListing/EmlakListing';
import EmlakListingPagination from './components/EmlakListing/EmlakListingPagination';
import EmlakEdit from './components/EmlakListing/EmlakEdit';
import Search from './components/Search/Search';  
import React, { useState } from 'react';
import Navbar from './components/NavbarV2/NavbarV2';
import CountKiralik from './components/widget/CountKiralik';
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
          <Route path="/Search" element={<Search/>}/>
          <Route path="/EmlakEdit/:emlakId" element={<EmlakEdit />} />
         </Routes>
       </BrowserRouter>
     
    </div>
  );
}

export default App;
