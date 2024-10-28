import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import "./styles/login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://black-2ers.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: username, contraseña: password })
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token);

                const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
                const userRole = decodedToken.rol;

                if (userRole === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                console.error('Error de autenticación:', data.message);
            }
        } catch (error) {
            console.error('Error en la red:', error);
        }
    };

    const handleCreateUser = () => {
        navigate('/create-user'); // Redirige a la página de creación de usuario
    };

    return (
        <div className="login-container">
    <h2>Iniciar Sesión</h2>
    <form onSubmit={handleSubmit}>
        <label>
            Usuario:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </label>
        <label>
            Contraseña:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <button type="submit">Iniciar sesión</button>
    </form>
    <button className="create-user-button" onClick={handleCreateUser}>Crear Usuario</button>
</div>
    );
};

export default Login;
