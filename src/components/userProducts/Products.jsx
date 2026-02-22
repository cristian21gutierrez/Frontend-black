import { useState, useEffect } from 'react';
import Modal from './Modal';
import ProductList from './ProductList';
import OrderForm from './OrderForm';
import ProductService from '../services/ProductService';
import OrderService from '../services/OrderService';
import '../styles/products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await ProductService.getProducts();
            setProducts(data || []);
        } catch {
            setError('Error al obtener productos. Intenta nuevamente.');
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
        if (!selectedProduct || Number(quantity) <= 0) {
            setError('Selecciona un producto y una cantidad válida.');
            return;
        }

        try {
            await OrderService.createOrder({
                productId: selectedProduct._id,
                quantity: parseInt(quantity, 10),
            });

            setError('');
            setIsModalOpen(false);
            setQuantity(1);
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'No se pudo realizar el pedido.');
        }
    };

    return (
        <div className="products-container">
            <h1>Productos Disponibles</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
