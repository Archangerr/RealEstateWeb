import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import {useAuth} from '../Login/AuthProvider';

import { loginUser } from '../../services/loginService';


export default function Login({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [emlakciIdv1, setEmlakciId] = useState();
  //const { isAuthenticated, login, logout } = useAuth();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = await loginUser({
  //       username: username,
  //       password: password,
  //     });
  //     setToken(token.token);
  //     localStorage.setItem('userToken', token.token);
  //     var decoded = jwt_decode(token.token);
  //     let claimRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  //     console.log("decoded",decoded);
  //     let idValue = decoded.Id;
  //     let isAdmin1 = false;
  //     isAdmin1 = claimRole && claimRole.includes('Admin');
  //     localStorage.setItem('isAdmin', isAdmin1);
  //     localStorage.setItem('emlakciId', idValue);
  //   } catch (error) {
  //     console.error('Login failed:', error);

  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = await loginUser({
            username: username,
            password: password,
        });

        // Using the login function from the AuthContext
        setToken(token.token);

        var decoded = jwt_decode(token.token);
        let claimRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        let idValue = decoded.Id;
        let isAdmin1 = claimRole && claimRole.includes('Admin');
        localStorage.setItem('isAdmin', isAdmin1);
        localStorage.setItem('emlakciId', idValue);
    } catch (error) {
        console.error('Login failed:', error);
    }
};

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }