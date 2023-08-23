    import React, { useState, useContext, useEffect } from "react";
    import { Navigate } from "react-router-dom";
    import Login from "./Login";

    const AuthContext = React.createContext({
        isAuthenticated: false,
        login: () => { },
        logout: () => { },
    });

    export function useAuth() {
        return useContext(AuthContext);
    }

    export const AuthProvider = ({ children }) => {
        const [isAuthenticated, setAuthenticated] = useState(() => {
            const token = localStorage.getItem("userToken");
            return token !== null;
        });

         const login = (token) => {
            localStorage.setItem("userToken", token);
            setAuthenticated(true);
            console.log("AuthProvider inside login", isAuthenticated);
        };

        const logout = () => {
            localStorage.removeItem("userToken");
            setAuthenticated(false);
        };

        useEffect(() => {
            // This function checks for the token every time the component renders
            const token = localStorage.getItem("userToken");
            if (token) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
            return () => { };
        }, [isAuthenticated]); // Note: added isAuthenticated to the dependency array

        return (
            <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };
