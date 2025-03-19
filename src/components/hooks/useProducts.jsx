import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

const useProducts = () => {
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
    const token = localStorage.getItem('token');

    
    const fetchProducts = async () => {
        const data = await ProductService.getProducts(token);
        if (data) setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createProduct = async () => {
        const success = await ProductService.createProduct(token, formData);
        if (success) {
            fetchProducts();
            resetForm();
        }
    };

    const editProduct = async () => {
        const success = await ProductService.updateProduct(token, editingProductId, formData);
        if (success) {
            fetchProducts();
            resetForm();
            setIsEditing(false);
        }
    };

    const deleteProduct = async (productId) => {
        const success = await ProductService.deleteProduct(token, productId);
        if (success) fetchProducts();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        isEditing ? editProduct() : createProduct();
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

    const resetForm = () => {
        setFormData({
            nombre: '',
            precio: '',
            descripcion: '',
            categoria: '',
            stock: '',
        });
    };

    return {
        products,
        formData,
        isEditing,
        handleChange,
        handleSubmit,
        handleEditClick,
        deleteProduct,
    };
};

export default useProducts;
