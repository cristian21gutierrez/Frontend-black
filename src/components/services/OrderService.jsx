import api from '../../api/config';

const OrderService = {
    getAllOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },
    getMyOrders: async () => {
        const response = await api.get('/orders/myorders');
        return response.data;
    },
    createOrder: async (payload) => {
        const response = await api.post('/orders', payload);
        return response.data;
    },
    updateOrderStatus: async (orderId, status) => {
        const response = await api.put(`/orders/${orderId}`, { status });
        return response.data;
    },
    deleteOrder: async (orderId) => {
        const response = await api.delete(`/orders/${orderId}`);
        return response.data;
    },
};

export default OrderService;
