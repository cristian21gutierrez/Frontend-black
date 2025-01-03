import React, { useEffect, useState } from 'react';
import "../styles/products.css";
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (category = '') => {
        setLoading(true);
        try {
            const url = category 
                ? `https://black-2ers.onrender.com/api/products/category/${category}` 
                : 'https://black-2ers.onrender.com/api/products'; 
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://black-2ers.onrender.com/api/products');
            const data = await response.json();
            const uniqueCategories = [...new Set(data.map(product => product.categoria))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    const handleProductSelect = (product) => {
        setSelectedProduct(product === selectedProduct ? null : product); // Toggle seleccion
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
            const response = await fetch('https://black-2ers.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: selectedProduct._id,
                    quantity: parseInt(quantity, 10),
                }),
            });

            if (response.ok) {
                alert('Pedido realizado con éxito');
                setSelectedProduct(null);
                setQuantity(1);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'No se pudo realizar el pedido'}`);
            }
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
        }
    };

    return (
        <div>
            <h1>Productos Disponibles</h1>
            
            {/* Botón para ir a Mis Pedidos */}
            <Link to="/user/orders">
                <button>Ver Mis Pedidos</button>
            </Link>

            {/* Dropdown para seleccionar categoría */}
            <label htmlFor="category">Filtrar por categoría:</label>
            <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Mostrar productos */}
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
                            <button onClick={() => handleProductSelect(product)}>
                                {selectedProduct && selectedProduct._id === product._id ? 'Ocultar Formulario' : 'Seleccionar'}
                            </button>

                            {/* Si el producto está seleccionado, muestra el formulario */}
                            {selectedProduct && selectedProduct._id === product._id && (
                                <div className="order-form">
                                    <h2>Realizar Pedido</h2>
                                    <p>Producto seleccionado: {product.nombre}</p>
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
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
