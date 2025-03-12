import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import UserTable from './UserTable';
import '../styles/adminUser.css';

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
    try {
      const response = await fetch('https://black-2ers.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setFormData({
          nombre: '',
          apellido: '',
          correo: '',
          usuario: '',
          contraseña: '',
        });
      } else {
        console.error('Error al crear usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const editUser = async () => {
    try {
      const response = await fetch(`https://black-2ers.onrender.com/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
        setIsEditing(false);
        setEditingUserId(null);
        setFormData({
          nombre: '',
          apellido: '',
          correo: '',
          usuario: '',
          contraseña: '',
        });
      } else {
        console.error('Error al editar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://black-2ers.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        console.error('Error al eliminar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
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
      <UserForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isEditing={isEditing} />
      <h2>Usuarios Actuales</h2>
      <UserTable users={users} handleEditClick={handleEditClick} deleteUser={deleteUser} />
    </div>
  );
};

export default AdminUsers;
