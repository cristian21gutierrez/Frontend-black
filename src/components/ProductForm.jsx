import React from 'react';
import "./styles/ProductForm.css"

const ProductForm = ({ formData, handleChange, handleSubmit, isEditing }) => {
    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Editar Producto' : 'Crear Producto'}</h2>
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Precio</label>
                <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Descripción</label>
                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Categoría</label>
                <input
                    type="text"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="admin-submit" type="submit">{isEditing ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        </form>
    );
};

export default ProductForm;
