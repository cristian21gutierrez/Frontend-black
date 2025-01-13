import React from 'react';
import "./styles/ProductTable.css"

const ProductTable = ({ products, handleEditClick, deleteProduct }) => {
    return (
        <div className="table-responsive">
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.categoria}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button className="action-button" onClick={() => handleEditClick(product)}>Editar</button>
                                <button className="action-button" onClick={() => deleteProduct(product._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
