import { useState, useEffect } from 'react';
import OrderService from '../services/OrderService';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 1. Cargar pedidos
    const fetchOrders = async () => {
        try {
            const data = await OrderService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 2. Actualizar estado
    const updateOrderStatus = async (orderId, status) => {
        try {
            const updatedOrder = await OrderService.updateOrderStatus(orderId, status);
            // Actualizamos el estado local sin recargar toda la página
            setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
            handleCloseModal();
        } catch (error) {
            alert('No se pudo actualizar el pedido. Revisa tus permisos.');
        }
    };

    // 3. Eliminar pedido
    const deleteOrder = async (orderId) => {
        if (!window.confirm("¿Estás seguro de eliminar este pedido?")) return;
        try {
            await OrderService.deleteOrder(orderId);
            setOrders(orders.filter(order => order._id !== orderId));
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
        deleteOrder
    };
};

export default useOrders;