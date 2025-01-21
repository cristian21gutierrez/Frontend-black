import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            const response = await axios.get('https://black-2ers.onrender.com/api/products', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error.response?.data?.message || error.message);
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
            await axios.post('https://black-2ers.onrender.com/api/products', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            fetchProducts();
            setFormData({
                nombre: '',
                precio: '',
                descripcion: '',
                categoria: '',
                stock: '',
            });
        } catch (error) {
            console.error('Error al crear producto:', error.response?.data?.message || error.message);
        }
    };

    const editProduct = async () => {
        try {
            await axios.put(`https://black-2ers.onrender.com/api/products/${editingProductId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
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
        } catch (error) {
            console.error('Error al editar producto:', error.response?.data?.message || error.message);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`https://black-2ers.onrender.com/api/products/${productId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            fetchProducts();
        } catch (error) {
            console.error('Error al eliminar producto:', error.response?.data?.message || error.message);
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
