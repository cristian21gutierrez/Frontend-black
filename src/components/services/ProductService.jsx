import api from '../../api/config';

const ProductService = {
    // 1. Obtener todos los productos
    getProducts: async () => {
        const response = await api.get('/products'); // <--- CAMBIO: de 'productos' a 'products'
        return response.data;
    },

    // 2. Crear un producto nuevo
    createProduct: async (productData) => {
        const response = await api.post('/products', productData); // <--- CAMBIO
        return response.data;
    },

    // 3. Editar un producto
    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData); // <--- CAMBIO
        return response.data;
    },

    // 4. Eliminar un producto
    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`); // <--- CAMBIO
        return response.data;
    }
};

export default ProductService;