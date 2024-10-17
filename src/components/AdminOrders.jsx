import React, { useState, useEffect } from 'react';
import "./styles/adminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [editingOrderId, setEditingOrderId] = useState(null);

    // Obtener token de localStorage
    const token = localStorage.getItem('token');

    // Obtener todos los pedidos
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Incluyendo el token
                },
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        }
    };

    // Llamada inicial para obtener los pedidos
    useEffect(() => {
        fetchOrders();
    }, []);

    // Manejar el cambio de estado del pedido
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    // Actualizar el estado del pedido
    const updateOrderStatus = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${editingOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Incluyendo el token
                },
                body: JSON.stringify({ status }),
            });
            const updatedOrder = await response.json();

            setOrders(orders.map((order) =>
                order._id === updatedOrder._id ? updatedOrder : order
            ));
            setEditingOrderId(null);
            setStatus('');
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
        }
    };

    // Preparar el formulario para editar un pedido
    const handleEditClick = (order) => {
        setEditingOrderId(order._id);
        setStatus(order.status);
    };

    // Eliminar un pedido
    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Incluyendo el token
                },
            });

            if (response.ok) {
                setOrders(orders.filter(order => order._id !== orderId)); // Filtrar el pedido eliminado
            } else {
                console.error('Error al eliminar el pedido:', await response.json());
            }
        } catch (error) {
            console.error('Error al eliminar el pedido:', error);
        }
    };

    return (
        <div className="admin-orders-container">
            <h1 className="admin-orders-title">Administrar Pedidos</h1>

            {/* Listado de pedidos */}
            <h2 className="admin-orders-title">Pedidos Actuales</h2>
            <table className="admin-orders-table">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId ? order.userId.nombre : 'Desconocido'}</td>
                            <td>{order.productId ? order.productId.nombre : 'Desconocido'}</td>
                            <td>{order.quantity}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className="admin-orders-action-button" onClick={() => handleEditClick(order)}>Cambiar Estado</button>
                                <button className="admin-orders-action-button delete" onClick={() => deleteOrder(order._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para cambiar el estado del pedido */}
            {editingOrderId && (
                <form className="admin-orders-form" onSubmit={updateOrderStatus}>
                    <div>
                        <label>Estado del Pedido</label>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Completado">Completado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                    <button type="submit">Actualizar Estado</button>
                </form>
            )}
        </div>
    );
};

export default AdminOrders;
