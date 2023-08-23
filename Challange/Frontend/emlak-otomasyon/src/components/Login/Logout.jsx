import React from 'react';
import { Navigate, useHistory } from 'react-router-dom';

function Logout() {

    const handleLogout = () => {
        
        let token = localStorage.getItem('userToken');
        console.log("login", token);
        // Clear user data & authentication token from local storage
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('emlakciId');
        localStorage.removeItem('userToken');
        token = localStorage.getItem('userToken');
        console.log("logout", token);

        // Optionally, make an API call to invalidate the session on the server-side

        // Redirect to home page or login page
       // Navigate('/*');
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
