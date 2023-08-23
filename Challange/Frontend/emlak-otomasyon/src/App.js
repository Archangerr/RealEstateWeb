import { Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import EmlakListing from './components/EmlakListing/EmlakListing';
import EmlakListingPagination from './components/EmlakListing/EmlakListingPagination';
import ParametersAdd from './components/Parameters/ParametersAdd';
import EmlakEdit from './components/EmlakListing/EmlakEdit';
import EmlakAdd from './components/EmlakListing/EmlakAdd';
import Search from './components/Search/Search';
import React, { useState, useEffect } from 'react';
import Navbar from './components/NavbarV2/NavbarV2';
import EmlakDetails from './components/Details/EmlakDetails';
import MapPage from './components/Map/MapPage';
import Map from './components/Map/Map'
import ProfilePage from './components/Profile/ProfilePage'
import CountKiralik from './components/widget/CountKiralik';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './components/Admin/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from "./components/Login/AuthProvider";

function App() {

  //   const [token, setToken] = useState(localStorage.getItem('userToken'));
  //   console.log("userToken", token);
  //   function handleSetToken(value) {
  //     setToken(value);
  //     localStorage.setItem('userToken', value);
  // }
  // useEffect(() => {
  //   if (!token) {
  //      <login setToken={handleSetToken} />
  //   }
  // }, [token]);

  // if(!token) {
  //   return <Login setToken={handleSetToken} />
  // }
  const { isAuthenticated, login, logout } = useAuth();
  console.log("isAuthenticated app js ici", isAuthenticated);
  if (!isAuthenticated) {
    return (
      // <AuthProvider>
        <Login setToken={login} />
    );
  }
  console.log("isAuthenticated", isAuthenticated);





  return (
      <div className="wrapper">
        <h1>EmlakOtomasyon</h1>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/EmlakListing" element={<EmlakListing />} />
            <Route path="*" element={<Navigate to="/EmlakListing" replace />} />
            <Route path="/EmlakListingPagination" element={<EmlakListingPagination />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/EmlakEdit/:emlakId" element={<EmlakEdit />} />
            <Route path="/ParametersAdd" element={<ParametersAdd />} />
            <Route path="/EmlakAdd" element={<EmlakAdd />} />
            <Route path="/EmlakDetails/:emlakId" element={<EmlakDetails />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/ProfilePage/:emlakciId" element={<ProfilePage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
