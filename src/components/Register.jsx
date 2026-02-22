import { useState } from 'react';
import AuthService from './services/AuthService';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        usuario: '',
        contraseña: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await AuthService.register(formData);
            setMessage('Usuario registrado exitosamente');
            setFormData({ nombre: '', apellido: '', correo: '', usuario: '', contraseña: '' });
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Error al registrar usuario');
        }
    };

    return (
        <div>
            <h2>Registrar Nuevo Usuario</h2>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                </div>
                <div>
                    <label>Correo</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                </div>
                <div>
                    <label>Usuario</label>
                    <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
