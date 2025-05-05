import React, { useState, useEffect, useMemo } from 'react';
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

    // Verificar si hay token
    const fetchOrders = async () => {
        if (!token) {
            console.error('Token no encontrado');
            alert('No autorizado, por favor inicie sesión');
            return;
        }
        try {
            const response = await axios.get('https://black-2ers.onrender.com/api/orders', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error al obtener pedidos:', error.response?.data?.message || error.message);
            alert('No se pudo cargar la información de los pedidos');
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    // Filtrar pedidos por nombre de usuario
    const filteredOrders = useMemo(() => {
        return orders.filter(order =>
            order.userId?.nombre?.toLowerCase().includes(searchUser.toLowerCase())
        );
    }, [orders, searchUser]);

    // Agrupar totales por fecha y usuario
    useEffect(() => {
        const grouped = {};
        filteredOrders.forEach(order => {
            const fecha = new Date(order.createdAt).toLocaleDateString();
            const usuario = order.userId?.nombre || 'Desconocido';
            const precio = order.productId?.precio || 0;
            const totalPedido = precio * order.quantity;

            if (!grouped[fecha]) grouped[fecha] = {};
            if (!grouped[fecha][usuario]) grouped[fecha][usuario] = 0;

            grouped[fecha][usuario] += totalPedido;
        });
        setGroupedTotals(grouped);
    }, [filteredOrders]);

    const handleEditClick = (order) => setSelectedOrder(order);
    const handleCloseModal = () => setSelectedOrder(null);

    // Actualizar estado del pedido
    const updateOrderStatus = async (orderId, newStatus) => {
        if (!token || userRole !== 'admin') {
            alert('No autorizado');
            return;
        }
        

        try {
            const response = await axios.put(
              `https://black-2ers.onrender.com/api/orders/status/${orderId}`,
                { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            const updatedOrder = response.data;

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === updatedOrder._id
                        ? { ...order, status: updatedOrder.status }
                        : order
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado:', error.response?.data?.message || error.message);
            alert('Error al actualizar el estado del pedido');
        }
    };

    // Eliminar pedido
    const deleteOrder = async (orderId) => {
        if (!token) {
            alert('No autorizado');
            return;
        }

        try {
            await axios.delete(`https://black-2ers.onrender.com/api/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error al eliminar el pedido:', error.response?.data?.message || error.message);
            alert('No se pudo eliminar el pedido');
        }
    };

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

            <OrdersTable
                orders={filteredOrders}
                onEditClick={handleEditClick}
                onDeleteClick={deleteOrder}
            />

            {selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onUpdateStatus={updateOrderStatus}
                />
            )}

            <div className="totales-por-fecha">
                <h2>Totales por Fecha y Usuario</h2>
                {Object.entries(groupedTotals).map(([fecha, usuarios]) => (
                    <div key={fecha}>
                        <h3>{fecha}</h3>
                        <ul>
                            {Object.entries(usuarios).map(([usuario, total]) => (
                                <li key={usuario}>
                                    {usuario}: ${total.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
