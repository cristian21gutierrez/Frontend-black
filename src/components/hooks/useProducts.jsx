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

    // Función para traer productos
    const fetchProducts = async () => {
        try {
            const data = await ProductService.getProducts();
            if (data) setProducts(data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await ProductService.updateProduct(editingProductId, formData);
            } else {
                await ProductService.createProduct(formData);
            }
            fetchProducts(); // Recargamos la lista
            resetForm();     // Limpiamos el formulario
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const deleteProduct = async (productId) => {
        if (window.confirm("¿Eliminar este producto?")) {
            try {
                await ProductService.deleteProduct(productId);
                fetchProducts();
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    const handleEditClick = (product) => {
        setIsEditing(true);
        setEditingProductId(product._id);
        setFormData({ ...product });
    };

    const resetForm = () => {
        setFormData({ nombre: '', precio: '', descripcion: '', categoria: '', stock: '' });
        setIsEditing(false);
        setEditingProductId(null);
    };

    return { products, formData, isEditing, handleChange, handleSubmit, handleEditClick, deleteProduct };
};

export default useProducts;