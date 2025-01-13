import React, { useState, useEffect } from 'react';
import OrdersTable from './OrdersTable';
import EditOrderModal from './EditOrderModal';
import "./styles/adminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const token = localStorage.getItem('token');

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://black-2ers.onrender.com/api/orders', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleEditClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`https://black-2ers.onrender.com/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const updatedOrder = await response.json();
            setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
            handleCloseModal();
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
        }
    };

    
    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`https://black-2ers.onrender.com/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setOrders(orders.filter(order => order._id !== orderId));
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
