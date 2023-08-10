import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Author/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import { Navigate } from "react-router-dom";
import TokenContext from './components/Token/TokenContext';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  

  return (
    <div className="wrapper">
      {/* <TokenContext.Provider value={token}> */}

       <h1>Application</h1>
       <BrowserRouter>
         <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />  
         </Routes>
       </BrowserRouter>
      {/* </TokenContext.Provider> */}
    </div>
  );
}

export default App;
