import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import AdminNavigation from './AdminNavigation';

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
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://black-2ers.onrender.com/api/products', {
                headers: { 'Authorization': `Bearer ${token}` },
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            if (response.ok) {
                fetchProducts();
                setFormData({
                    nombre: '',
                    precio: '',
                    descripcion: '',
                    categoria: '',
                    stock: '',
                });
            } else {
                console.error('Error al crear producto:', await response.json());
            }
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
            if (response.ok) {
                fetchProducts();
                setIsEditing(false);
                setFormData({
                    nombre: '',
                    precio: '',
                    descripcion: '',
                    categoria: '',
                    stock: '',
                });
                setEditingProductId(null);
            } else {
                console.error('Error al editar producto:', await response.json());
            }
        } catch (error) {
            console.error('Error al editar producto:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`https://black-2ers.onrender.com/api/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                fetchProducts();
            } else {
                console.error('Error al eliminar producto:', await response.json());
            }
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

    const goToOrders = () => navigate('/admin/orders');
    const goToUsers = () => navigate('/admin/users');

    return (
        <div className="admin-container">
            <h1 className="admin-title">Administrar Productos</h1>
            <AdminNavigation goToOrders={goToOrders} goToUsers={goToUsers} />
            <ProductForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEditing={isEditing}
            />
            <h2 className="product-list-title">Productos Actuales</h2>
            <ProductTable
                products={products}
                handleEditClick={handleEditClick}
                deleteProduct={deleteProduct}
            />
        </div>
    );
};

export default AdminProducts;
