import { Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import EmlakListing from './components/EmlakListing/EmlakListing';
import EmlakListingPagination from './components/EmlakListing/EmlakListingPagination';
import ParametersAdd from './components/Parameters/ParametersAdd';
import EmlakEdit from './components/EmlakListing/EmlakEdit';
import EmlakAdd from './components/EmlakListing/EmlakAdd';
import Search from './components/Search/Search';  
import React, { useState } from 'react';
import Navbar from './components/NavbarV2/NavbarV2';
import EmlakDetails from './components/Details/EmlakDetails';
import MapPage from './components/Map/MapPage';
import Map from './components/Map/Map'
import ProfilePage from './components/Profile/ProfilePage'
import CountKiralik from './components/widget/CountKiralik';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/ParametersAdd" element={<ParametersAdd />} />
          <Route path="/EmlakAdd" element={<EmlakAdd />} />
          <Route path="/EmlakDetails/:emlakId" element={<EmlakDetails/>} />
          <Route path="/MapPage" element={<MapPage/>} />
          <Route path="/Map" element={<Map/>} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
         </Routes>
       </BrowserRouter>
     
    </div>
  );
}

export default App;
