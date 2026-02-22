import { useState, useEffect } from 'react';
import api from '../../api/config'; 
import UserForm from './UserForm';
import UserTable from './UserTable';
import '../styles/adminUser.css';

// 1. Estado inicial limpio para el formulario
const initialFormState = {
  nombre: '',
  apellido: '',
  correo: '',
  usuario: '',
  contraseña: '',
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // 2. Obtener usuarios (Mucho más corto sin 'fetch')
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); // No más URL larga, no más headers manuales
      setUsers(response.data); // Axios ya devuelve el JSON listo en .data
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Crear usuario
  const createUser = async () => {
    try {
      const response = await api.post('/users', formData);
      setUsers([...users, response.data]);
      setFormData(initialFormState); // Usamos el estado inicial limpio
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  // 4. Editar usuario
  const editUser = async () => {
    try {
      const response = await api.put(`/users/${editingUserId}`, formData);
      setUsers(users.map((u) => (u._id === editingUserId ? response.data : u)));
      setIsEditing(false);
      setEditingUserId(null);
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  // 5. Eliminar usuario
  const deleteUser = async (userId) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return; // Un toque pro: confirmar antes de borrar
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? editUser() : createUser();
  };

  const handleEditClick = (user) => {
    setIsEditing(true);
    setEditingUserId(user._id);
    setFormData({ ...user, contraseña: '' }); // Cargamos los datos del usuario, pero dejamos la contraseña vacía
  };

  return (
    <div className="admin-users">
      <h1>Administrar Usuarios</h1>
      <UserForm 
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        isEditing={isEditing} 
      />
      <h2>Usuarios Actuales</h2>
      <UserTable 
        users={users} 
        handleEditClick={handleEditClick} 
        deleteUser={deleteUser} 
      />
    </div>
  );
};

export default AdminUsers;