import React from 'react';

const ProductList = ({ products, onProductSelect }) => (
    <div className="products-grid">
        {products.map((product) => (
            <div key={product._id} className="product-item">
                <h3>{product.nombre}</h3>
                <p>Precio: ${product.precio}</p>
                <p>Descripción: {product.descripcion}</p>
                <p>Categoría: {product.categoria}</p>
                <button onClick={() => onProductSelect(product)}>Seleccionar</button>
            </div>
        ))}
    </div>
);

export default ProductList;
