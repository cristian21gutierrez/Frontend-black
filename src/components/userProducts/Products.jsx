import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Modal from './Modal';
import "../styles/products.css";
import { Link } from 'react-router-dom';

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

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
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
        <div>
            <h1>Productos Disponibles</h1>
            
            <Link to="/user/orders">
                <button>Ver Mis Pedidos</button>
            </Link>

            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-item">
                            <h3>{product.nombre}</h3>
                            <p>Precio: ${product.precio}</p>
                            <p>Descripción: {product.descripcion}</p>
                            <p>Categoría: {product.categoria}</p>
                            <button onClick={() => handleProductSelect(product)}>Seleccionar</button>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                <div className="order-form">
                    <h2>Realizar Pedido</h2>
                    <p>Producto seleccionado: {selectedProduct?.nombre}</p>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                    />
                    <button onClick={placeOrder} disabled={quantity <= 0}>
                        Realizar Pedido
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Products;
