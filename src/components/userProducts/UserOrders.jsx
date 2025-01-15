import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import "../styles/UserOrders.css";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);  // Obtenemos el token desde el contexto

    // Función para obtener los pedidos del usuario
    const fetchUserOrders = async () => {
        if (!auth.token) {
            setError('Token no disponible. Asegúrate de estar autenticado.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://black-2ers.onrender.com/api/orders/myorders', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,  // Envío del token JWT en el encabezado
                    'Content-Type': 'application/json',  // Especificamos que la respuesta es en formato JSON
                },
            });

            const data = await response.json();

            if (response.ok) {
                setOrders(data);  // Actualiza el estado con los pedidos obtenidos
            } else {
                setError(data.message || 'Error al obtener los pedidos.');  // Muestra el error del backend
            }
        } catch (error) {
            setError('Error al conectar con el servidor.');  // Error de red o servidor
        } finally {
            setLoading(false);  // Se detiene el indicador de carga
        }
    };

    // Función para eliminar un pedido
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
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));  // Elimina el pedido del estado
                alert('Pedido eliminado correctamente.');
            } else {
                alert(data.message || 'Error al eliminar el pedido.');
            }
        } catch (error) {
            alert('Error al conectar con el servidor.');
        }
    };

    // Usamos el hook useEffect para hacer la solicitud cuando el componente se monta o cuando el token cambia
    useEffect(() => {
        fetchUserOrders();
    }, [auth.token]);  // Reaccionar a cambios en el token

    // Mostrar mensaje de carga mientras obtenemos los pedidos
    if (loading) {
        return <div>Cargando pedidos...</div>;
    }

    // Mostrar error si hay algún problema
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Si todo está listo, mostramos los pedidos
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
