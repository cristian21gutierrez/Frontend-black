import axios from 'axios';

const API_URL = 'https://black-2ers.onrender.com/api/products';

const ProductService = {
    async getProducts(token) {
        try {
            const response = await axios.get(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener productos:', error.response?.data?.message || error.message);
            return null;
        }
    },

    async createProduct(token, productData) {
        try {
            await axios.post(API_URL, productData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return true;
        } catch (error) {
            console.error('Error al crear producto:', error.response?.data?.message || error.message);
            return false;
        }
    },

    async updateProduct(token, productId, productData) {
        try {
            await axios.put(`${API_URL}/${productId}`, productData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return true;
        } catch (error) {
            console.error('Error al editar producto:', error.response?.data?.message || error.message);
            return false;
        }
    },

    async deleteProduct(token, productId) {
        try {
            await axios.delete(`${API_URL}/${productId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error.response?.data?.message || error.message);
            return false;
        }
    },
};

export default ProductService;
