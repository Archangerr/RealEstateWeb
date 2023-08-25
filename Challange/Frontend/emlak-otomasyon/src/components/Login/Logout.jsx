import React from 'react';
import { Navigate, useHistory } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useState } from 'react';

function Logout() {
    const { logout } = useAuth();
    // const [redirectTo, setRedirectTo] = useState(null);

    const handleLogout = () => {
        
        let token = localStorage.getItem('userToken');
        console.log("login", token);
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('emlakciId');
        localStorage.removeItem('userToken');
        token = localStorage.getItem('userToken');
        console.log("logout", token);
        logout();

        // Optionally, make an API call to invalidate the session on the server-side
        
     //  setRedirectTo('/');
    }
    // if (redirectTo) {
    //     return <Navigate to={redirectTo} replace />;
    // }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
