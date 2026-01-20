import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: '',
        token: '', 
    });
    // Estado para saber si estamos verificando la sesión al cargar la app
    const [loading, setLoading] = useState(true);

    // 1. Efecto de Persistencia: Se ejecuta una sola vez al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decodificamos el token para recuperar el rol
                const decoded = JSON.parse(atob(token.split('.')[1]));
                setAuth({
                    isAuthenticated: true,
                    role: decoded.rol, 
                    token, 
                });
            } catch (error) {
                console.error("Token inválido", error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false); // Terminamos de verificar
    }, []);

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
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};

// 2. Custom Hook: Para no tener que importar useContext(AuthContext) en cada archivo
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export default AuthContext;