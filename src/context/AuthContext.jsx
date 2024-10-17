import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: '',
        token: '', // Agrega el token aquí
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setAuth({
                isAuthenticated: true,
                role: decoded.role, // Asegúrate de que 'role' es el campo correcto en tu token
                token, // Guarda también el token
            });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setAuth({
            isAuthenticated: true,
            role: decoded.role, // Asegúrate de que 'role' es el campo correcto en tu token
            token, // Almacena el token
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            isAuthenticated: false,
            role: '',
            token: '', // Limpia el token al cerrar sesión
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
