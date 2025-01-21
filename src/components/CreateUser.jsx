import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [role, setRole] = useState('user'); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://black-2ers.onrender.com/api/users', {
                nombre,
                apellido,
                correo,
                usuario,
                contraseña,
                role,
            });

            if (response.status === 200) {
                console.log('Usuario creado exitosamente');
            } else {
                console.error('Error al crear usuario:', response.data.message);
            }
        } catch (error) {
            console.error('Error en la red:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </label>
                <label>
                    Correo:
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </label>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                </label>
                <label>
                    Rol:
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
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
