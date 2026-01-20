import api from '../../api/config';

const OrderService = {
    getAllOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },
    updateOrderStatus: async (orderId, status) => {
        // Ajustado a { status } para que coincida con tu backend
        const response = await api.put(`/orders/${orderId}`, { status });
        return response.data;
    },
    deleteOrder: async (orderId) => {
        const response = await api.delete(`/orders/${orderId}`);
        return response.data;
    }
};

export default OrderService;