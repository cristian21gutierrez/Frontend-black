import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // <--- Importante: usamos tu nuevo contexto
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import "./styles/login.css";

const Login = () => {
    // Estados para guardar lo que escribe el usuario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth(); 
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
                login(token); // Guardamos la sesión

                // Leemos el rol para saber a dónde mandarlo
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                navigate(decodedToken.rol === 'admin' ? '/admin' : '/dashboard');
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
                
                {/* Si hay un error, lo mostramos aquí arriba */}
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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