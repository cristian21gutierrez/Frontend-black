import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const getRoleFromToken = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.rol || '';
    } catch (error) {
        console.error('Token inválido', error);
        return '';
    }
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: '',
        token: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const role = getRoleFromToken(token);

            if (role) {
                setAuth({
                    isAuthenticated: true,
                    role,
                    token,
                });
            } else {
                localStorage.removeItem('token');
            }
        }

        setLoading(false);
    }, []);

    const login = (token) => {
        const role = getRoleFromToken(token);

        if (!role) {
            throw new Error('No se pudo validar el token recibido.');
        }

        localStorage.setItem('token', token);
        setAuth({
            isAuthenticated: true,
            role,
            token,
        });

        return role;
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export default AuthContext;
