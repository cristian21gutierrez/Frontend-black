import { useState, useEffect } from 'react';
import OrderService from '../services/OrderService';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getAllOrders();
            setOrders(data || []);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        try {
            const updatedOrder = await OrderService.updateOrderStatus(orderId, status);
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)),
            );
            handleCloseModal();
        } catch (error) {
            console.error('No se pudo actualizar el pedido:', error);
            throw error;
        }
    };

    const deleteOrder = async (orderId) => {
        if (!window.confirm('¿Estás seguro de eliminar este pedido?')) return;

        try {
            await OrderService.deleteOrder(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    const handleEditClick = (order) => setSelectedOrder(order);
    const handleCloseModal = () => setSelectedOrder(null);

    return {
        orders,
        selectedOrder,
        handleEditClick,
        handleCloseModal,
        updateOrderStatus,
        deleteOrder,
    };
};

export default useOrders;
