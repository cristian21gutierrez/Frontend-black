import React, { useEffect, useState } from 'react';
import "../styles/products.css"
import { Link } from 'react-router-dom'; // Importa Link

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Función para obtener todos los productos
    const fetchProducts = async (category = '') => {
        try {
            const url = category 
                ? `http://localhost:3000/api/products/category/${category}` 
                : 'http://localhost:3000/api/products'; // URL para obtener productos o filtrar por categoría
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    // Obtener las categorías únicas de los productos
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            const data = await response.json();
            const uniqueCategories = [...new Set(data.map(product => product.categoria))]; // Obtener categorías únicas
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    // Llamada inicial para obtener todos los productos y categorías
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Llamada cuando se selecciona una categoría
    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    // Manejar la selección del producto
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    // Manejar la cantidad del producto
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    // Realizar un pedido
    const placeOrder = async () => {
        if (!selectedProduct) {
            alert('Por favor, selecciona un producto.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Incluyendo el token
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
                alert('Error al realizar el pedido');
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

            {/* Formulario para hacer un pedido */}
            {selectedProduct && (
                <div className="order-form">
                    <h2>Realizar Pedido</h2>
                    <p>Producto seleccionado: {selectedProduct.nombre}</p>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                    />
                    <button onClick={placeOrder}>Realizar Pedido</button>
                </div>
            )}
        </div>
    );
};

export default Products;
