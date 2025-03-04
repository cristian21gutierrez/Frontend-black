import React from 'react';

const OrderForm = ({ selectedProduct, quantity, setQuantity, placeOrder }) => (
    <div className="order-form">
        <h2>Realizar Pedido</h2>
        <p>Producto seleccionado: {selectedProduct?.nombre}</p>
        <label htmlFor="quantity">Cantidad:</label>
        <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={placeOrder} disabled={quantity <= 0}>
            Realizar Pedido
        </button>
    </div>
);

export default OrderForm;
