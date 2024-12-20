import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/adminUser.css"

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        usuario: '',
        contraseña: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://black-2ers.onrender.com/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const createUser = async () => {
        // Función para crear usuario
    };

    const editUser = async () => {
        // Función para editar usuario
    };

    const deleteUser = async (userId) => {
        // Función para eliminar usuario
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editUser();
        } else {
            createUser();
        }
    };

    const handleEditClick = (user) => {
        setIsEditing(true);
        setEditingUserId(user._id);
        setFormData({
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            usuario: user.usuario,
            contraseña: '',
        });
    };

    const goToOrders = () => {
        navigate('/admin/orders');
    };

    return (
        <div className="admin-users">
            <h1>Administrar Usuarios</h1>
            <button className="btn-primary" onClick={goToOrders}>Ir a Admin Ordenes</button>
            <form className="user-form" onSubmit={handleSubmit}>
                {['nombre', 'apellido', 'correo', 'usuario', 'contraseña'].map((field) => (
                    <div key={field}>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'correo' ? 'email' : field === 'contraseña' ? 'password' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="btn-submit">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</button>
            </form>
            <h2>Usuarios Actuales</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.correo}</td>
                            <td>{user.usuario}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEditClick(user)}>Editar</button>
                                <button className="btn-delete" onClick={() => deleteUser(user._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
