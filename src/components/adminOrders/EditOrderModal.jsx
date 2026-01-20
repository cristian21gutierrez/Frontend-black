import React, { useState, useEffect } from "react";

const EditOrderModal = ({ order, onClose, onUpdateStatus }) => {
    const [status, setStatus] = useState(order?.status || "pendiente");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (order) {
            setStatus(order.status || "pendiente");
            setMessage("");
        }
    }, [order]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await onUpdateStatus(order._id, status);
            setMessage("Estado actualizado correctamente.");
            setTimeout(onClose, 1000); // cierra luego de un segundo
        } catch (error) {
            setMessage("Error al actualizar el estado.");
        } finally {
            setLoading(false);
        }
    };

    if (!order) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Editar Estado del Pedido</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="estado">Estado:</label>
                    <select
                        id="estado"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en proceso">En proceso</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>

                    {message && <p style={{ marginTop: "10px" }}>{message}</p>}

                    <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
                        <button type="submit" disabled={loading}>
                            {loading ? "Actualizando..." : "Actualizar"}
                        </button>
                        <button type="button" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    },
};

export default EditOrderModal;
