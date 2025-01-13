import React from 'react';

const OrdersTable = ({ orders, onEditClick, onDeleteClick }) => {
    return (
        <table className="admin-orders-table">
            <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Usuario</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.userId ? order.userId.nombre : 'Desconocido'}</td>
                        <td>{order.productId ? order.productId.nombre : 'Desconocido'}</td>
                        <td>{order.quantity}</td>
                        <td>{order.status}</td>
                        <td>
                            <button onClick={() => onEditClick(order)}>Cambiar Estado</button>
                            <button onClick={() => onDeleteClick(order._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrdersTable;
