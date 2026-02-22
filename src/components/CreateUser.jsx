import { useState } from 'react';
import api from '../api/config';

const CreateUser = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            await api.post('/users', {
                nombre,
                apellido,
                correo,
                usuario,
                contraseña,
                role,
            });
            setMessage('Usuario creado exitosamente');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al crear usuario');
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </label>
                <label>
                    Apellido:
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </label>
                <label>
                    Correo:
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </label>
                <label>
                    Usuario:
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                </label>
                <label>
                    Rol:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button type="submit">Crear usuario</button>
            </form>
        </div>
    );
};

export default CreateUser;
