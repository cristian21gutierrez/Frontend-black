import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import "./styles/login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('https://black-2ers.onrender.com/api/auth/login', {
                usuario: username,
                contraseña: password
            });

            if (response.status === 200) {
                const { token } = response.data;
                login(token);

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userRole = decodedToken.rol;

                navigate(userRole === 'admin' ? '/admin' : '/dashboard');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error en la autenticación.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="login-wrapper"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
