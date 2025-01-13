import React, { useState } from 'react';

const EditOrderModal = ({ order, onClose, onUpdateStatus }) => {
    const [status, setStatus] = useState(order.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateStatus(order._id, status);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cambiar Estado del Pedido</h2>
                <form onSubmit={handleSubmit}>
                    <label>Estado del Pedido</label>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    <button type="submit">Actualizar</button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default EditOrderModal;