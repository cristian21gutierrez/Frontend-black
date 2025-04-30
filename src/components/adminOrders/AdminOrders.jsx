import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersTable from './OrdersTable';
import EditOrderModal from './EditOrderModal';
import "../styles/adminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchUser, setSearchUser] = useState('');
    const [groupedTotals, setGroupedTotals] = useState({});
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const fetchOrders = async () => {
        try {
            if (!token) return;
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

    useEffect(() => {
        // Agrupar por fecha y sumar totales
        const totals = {};
        orders.forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString();
            const precio = order.productId?.precio || 0;
            const totalPedido = precio * order.quantity;
            if (!totals[date]) totals[date] = 0;
            totals[date] += totalPedido;
        });
        setGroupedTotals(totals);
    }, [orders]);

    const handleEditClick = (order) => setSelectedOrder(order);
    const handleCloseModal = () => setSelectedOrder(null);

    const updateOrderStatus = async (orderId, status) => {
        try {
            if (!token || userRole !== 'admin') return;
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
            console.error('Error al actualizar:', error.response?.data?.message || error.message);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`https://black-2ers.onrender.com/api/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error al eliminar:', error.response?.data?.message || error.message);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.userId?.nombre?.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <div className="admin-orders-container">
            <h1 className="admin-orders-title">Administrar Pedidos</h1>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre de usuario..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
            </div>

            <OrdersTable orders={filteredOrders} onEditClick={handleEditClick} onDeleteClick={deleteOrder} />

            {selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onUpdateStatus={updateOrderStatus}
                />
            )}

            <div className="totales-por-fecha">
                <h2>Totales por Fecha</h2>
                <ul>
                    {Object.entries(groupedTotals).map(([fecha, total]) => (
                        <li key={fecha}>
                            {fecha}: ${total.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminOrders;
