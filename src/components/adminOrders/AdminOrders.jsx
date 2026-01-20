import React from 'react';
import useOrders from '../hooks/useOrders';
import OrdersTable from './OrdersTable';
import EditOrderModal from './EditOrderModal';
import "../styles/adminOrders.css";

const AdminOrders = () => {
    const { 
        orders, 
        selectedOrder, 
        handleEditClick, 
        handleCloseModal, 
        updateOrderStatus, 
        deleteOrder 
    } = useOrders();

    return (
        <div className="admin-orders-container">
            <h1 className="admin-orders-title">Administrar Pedidos</h1>
            
            <OrdersTable 
                orders={orders} 
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
        </div>
    );
};

export default AdminOrders;