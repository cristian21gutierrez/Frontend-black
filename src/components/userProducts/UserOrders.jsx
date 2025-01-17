import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import "../styles/UserOrders.css";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);  

    const fetchUserOrders = async () => {
        if (!auth.token) {
            setError('Token no disponible. Asegúrate de estar autenticado.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://black-2ers.onrender.com/api/orders/myorders', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,  
                    'Content-Type': 'application/json',  
                },
            });

            const data = await response.json();

            if (response.ok) {
                setOrders(data);  
            } else {
                setError(data.message || 'Error al obtener los pedidos.');  
            }
        } catch (error) {
            setError('Error al conectar con el servidor.');  
        } finally {
            setLoading(false);  
        }
    };

    const deleteOrder = async (orderId) => {
        if (!auth.token) {
            setError('Token no disponible.');
            return;
        }

        try {
            const response = await fetch(`https://black-2ers.onrender.com/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));  
                alert('Pedido eliminado correctamente.');
            } else {
                alert(data.message || 'Error al eliminar el pedido.');
            }
        } catch (error) {
            alert('Error al conectar con el servidor.');
        }
    };
  
    useEffect(() => {
        fetchUserOrders();
    }, [auth.token]);  
    
    if (loading) {
        return <div>Cargando pedidos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Mis Pedidos</h1>
            {orders.length === 0 ? (
                <p>No tienes pedidos aún.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <h3>Pedido #{order._id}</h3>
                            <p>Producto: {order.productId ? order.productId.nombre : 'Producto no disponible'}</p>
                            <p>Cantidad: {order.quantity}</p>
                            <p>Estado: {order.status}</p>
                            <button onClick={() => deleteOrder(order._id)} className="delete-button">
                                Eliminar Pedido
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOrders;
