import React from 'react';
import "../styles/OrdersTable.css";

const OrdersTable = ({ orders, onEditClick, onDeleteClick }) => {
    return (
        <div className="orders-table-container">
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.userId ? order.userId.nombre : 'Desconocido'}</td>
                            <td>{order.productId ? order.productId.nombre : 'Desconocido'}</td>
                            <td>
                                {order.productId && order.productId.precio != null
                                    ? `$${order.productId.precio.toFixed(2)}`
                                    : 'N/A'}
                            </td>
                            <td>{order.quantity}</td>
                            <td>{order.status}</td>
                            <td className="orders-actions">
                                <button 
                                    className="orders-action-button update" 
                                    onClick={() => onEditClick(order)}
                                >
                                    Cambiar Estado
                                </button>
                                <button 
                                    className="orders-action-button delete" 
                                    onClick={() => onDeleteClick(order._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
