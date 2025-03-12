import React, { useState } from 'react';

const EditOrderModal = ({ order, onClose, onUpdateStatus }) => {
    const [status, setStatus] = useState(order.status);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            setErrorMessage('El estado no puede estar vacío.');
            return;
        }
        setIsLoading(true);
        setErrorMessage('');

        try {
            await onUpdateStatus(order._id, status);  
            onClose(); 
        } catch (error) {
            setErrorMessage('Error al actualizar el estado del pedido.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cambiar Estado del Pedido</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Estado del Pedido</label>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default EditOrderModal;
