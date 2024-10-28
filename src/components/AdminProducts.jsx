import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        stock: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const navigate = useNavigate();  // Hook para navegar

    // Obtener token de localStorage
    const token = localStorage.getItem('token');

    // Obtener todos los productos
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const createProduct = async () => {
        try {
            const response = await fetch('https://black-2ers.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
            setFormData({ nombre: '', precio: '', descripcion: '', categoria: '', stock: '' });
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const editProduct = async () => {
        try {
            const response = await fetch(`https://black-2ers.onrender.com/api/products/${editingProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const updatedProduct = await response.json();
            setProducts(products.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            ));
            setFormData({ nombre: '', precio: '', descripcion: '', categoria: '', stock: '' });
            setIsEditing(false);
            setEditingProductId(null);
        } catch (error) {
            console.error('Error al editar producto:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await fetch(`https://black-2ers.onrender.com/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editProduct();
        } else {
            createProduct();
        }
    };

    const handleEditClick = (product) => {
        setIsEditing(true);
        setEditingProductId(product._id);
        setFormData({
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion,
            categoria: product.categoria,
            stock: product.stock,
        });
    };

    // Navegar a la gestión de órdenes
    const goToOrders = () => {
        navigate('/admin/orders');
    };

    // Navegar a la gestión de usuarios
    const goToUsers = () => {
        navigate('/admin/users');
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Administrar Productos</h1>
            
            <div className="admin-buttons">
                <button className="admin-button" onClick={goToOrders}>Ir a Admin Órdenes</button>
                <button className="admin-button" onClick={goToUsers}>Ir a Admin Usuarios</button>
            </div>

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

            <h2 className="product-list-title">Productos Actuales</h2>
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
        </div>
    );
};

export default AdminProducts;
