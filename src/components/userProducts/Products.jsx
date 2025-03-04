import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import "../styles/products.css";
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import OrderForm from './OrderForm';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://black-2ers.onrender.com/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const placeOrder = async () => {
        if (!selectedProduct) {
            alert('Por favor, selecciona un producto.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://black-2ers.onrender.com/api/orders',
                {
                    productId: selectedProduct._id,
                    quantity: parseInt(quantity, 10),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert('Pedido realizado con éxito');
                setIsModalOpen(false);
                setQuantity(1);
            } else {
                alert(`Error: ${response.data.message || 'No se pudo realizar el pedido'}`);
            }
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
            alert(`Error: ${error.response?.data?.message || 'Ocurrió un error inesperado'}`);
        }
    };

    return (
        <div className="products-container">
            <h1>Productos Disponibles</h1>
            
           

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <ProductList products={products} onProductSelect={handleProductSelect} />
            )}

            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                <OrderForm
                    selectedProduct={selectedProduct}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    placeOrder={placeOrder}
                />
            </Modal>
        </div>
    );
};

export default Products;
