import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import { loginUser } from '../../services/loginService';


export default function Login({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [emlakciIdv1, setEmlakciId] = useState();

  function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const payload = JSON.parse(window.atob(base64));
        return payload;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        username: username,
        password: password,
      });
      setToken(token.token);
      localStorage.setItem('userToken', token.token);
      var decoded = jwt_decode(token.token);
      let idValue = decoded.Id;
      console.log("decoded",decoded);
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}