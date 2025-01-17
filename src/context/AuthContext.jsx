import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: '',
        token: '', 
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setAuth({
            isAuthenticated: true,
            role: decoded.rol, 
            token, 
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            isAuthenticated: false,
            role: '',
            token: '', 
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
