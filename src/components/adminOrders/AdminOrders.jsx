import OrdersTable from './OrdersTable';
import EditOrderModal from './EditOrderModal';
import useOrders from '../hooks/useOrders';
import '../styles/adminOrders.css';

const AdminOrders = () => {
    const {
        orders,
        selectedOrder,
        handleEditClick,
        handleCloseModal,
        updateOrderStatus,
        deleteOrder,
    } = useOrders();

    const groupedTotals = orders.reduce((acc, order) => {
        const fecha = new Date(order.createdAt).toLocaleDateString();
        const usuario = order.userId?.usuario || order.userId?.nombre || 'Desconocido';
        const precioUnitario = order.productId?.precio || 0;
        const total = precioUnitario * (order.quantity || 0);

        if (!acc[fecha]) {
            acc[fecha] = {};
        }

        acc[fecha][usuario] = (acc[fecha][usuario] || 0) + total;
        return acc;
    }, {});

    return (
        <div className="admin-orders-container">
            <h1 className="admin-orders-title">Administrar Pedidos</h1>
            <OrdersTable orders={orders} onEditClick={handleEditClick} onDeleteClick={deleteOrder} />
            {selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onUpdateStatus={updateOrderStatus}
                />
            )}

            <div className="totales-por-fecha">
                <h2>Totales por Fecha y Usuario</h2>
                {Object.entries(groupedTotals).map(([fecha, usuarios]) => (
                    <div key={fecha}>
                        <h3>{fecha}</h3>
                        <ul>
                            {Object.entries(usuarios).map(([usuario, total]) => (
                                <li key={usuario}>
                                    {usuario}: ${total.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
