import React from 'react';

const AdminNavigation = ({ goToOrders, goToUsers }) => {
    return (
        <div className="admin-buttons">
            <button className="admin-button" onClick={goToOrders}>Ir a Admin Órdenes</button>
            <button className="admin-button" onClick={goToUsers}>Ir a Admin Usuarios</button>
        </div>
    );
};

export default AdminNavigation;
