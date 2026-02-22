import { useEffect, useState } from 'react';
import OrderService from '../services/OrderService';
import '../styles/UserOrders.css';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserOrders = async () => {
        try {
            const data = await OrderService.getMyOrders();
            setOrders(data || []);
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await OrderService.deleteOrder(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Error al eliminar el pedido.');
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const groupedByDate = orders.reduce((acc, order) => {
        const fecha = new Date(order.createdAt).toLocaleDateString();
        const precioUnitario = order.productId?.precio || 0;
        const total = precioUnitario * order.quantity;

        acc[fecha] = (acc[fecha] || 0) + total;

        return acc;
    }, {});

    if (loading) return <div>Cargando pedidos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1>Mis Pedidos</h1>
            {orders.length === 0 ? (
                <p>No tienes pedidos aún.</p>
            ) : (
                <>
                    <ul>
                        {orders.map((order) => {
                            const fecha = new Date(order.createdAt).toLocaleDateString();
                            const precioUnitario = order.productId?.precio || 0;
                            const total = precioUnitario * order.quantity;

                            return (
                                <li key={order._id}>
                                    <h3>Pedido #{order._id}</h3>
                                    <p>Producto: {order.productId ? order.productId.nombre : 'Producto no disponible'}</p>
                                    <p>Cantidad: {order.quantity}</p>
                                    <p>Precio unitario: ${precioUnitario.toFixed(2)}</p>
                                    <p>Total: ${total.toFixed(2)}</p>
                                    <p>Fecha: {fecha}</p>
                                    <p>Estado: {order.status}</p>
                                    {(order.status === 'pendiente' || order.status === 'proceso') && (
                                        <button onClick={() => deleteOrder(order._id)} className="delete-button">
                                            Eliminar Pedido
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <div className="resumen-por-fecha">
                        <h2>Resumen de compras por fecha</h2>
                        <ul>
                            {Object.entries(groupedByDate).map(([fecha, total]) => (
                                <li key={fecha}>
                                    <strong>{fecha}</strong>: ${total.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserOrders;
