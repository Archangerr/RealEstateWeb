import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

import { loginUser } from '../../services/loginService';


export default function Login({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        username: username,
        password: password,
      });
      setToken(token.token);
      localStorage.setItem('userToken', token.token);
      console.log("Login ici", token);
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