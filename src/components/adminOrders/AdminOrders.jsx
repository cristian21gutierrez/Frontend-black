import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersTable from './OrdersTable';
import EditOrderModal from './EditOrderModal';
import "../styles/adminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const token = localStorage.getItem('token');  
    const userRole = localStorage.getItem('userRole');  

    const fetchOrders = async () => {
        try {
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await axios.get('https://black-2ers.onrender.com/api/orders', {
                headers: { 'Authorization': `Bearer ${token}` },  
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error al obtener pedidos:', error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);  

    const handleEditClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            if (userRole !== 'admin') {  
                console.error('No tienes permisos para modificar este pedido');
                alert('No tienes permisos para modificar este pedido');
                return;
            }

            const response = await axios.put(
                `https://black-2ers.onrender.com/api/orders/${orderId}`,
                { status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const updatedOrder = response.data;
            setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
            handleCloseModal();
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error.response?.data?.message || error.message);
            if (error.response?.status === 403) {
                alert('No tienes permisos para modificar este pedido');
            }
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            await axios.delete(`https://black-2ers.onrender.com/api/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error al eliminar el pedido:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="admin-orders-container">
            <h1 className="admin-orders-title">Administrar Pedidos</h1>
            <OrdersTable orders={orders} onEditClick={handleEditClick} onDeleteClick={deleteOrder} />
            {selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onUpdateStatus={updateOrderStatus}
                />
            )}
        </div>
    );
};

export default AdminOrders;
