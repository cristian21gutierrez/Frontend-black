import axios from 'axios';

const api = axios.create({
    baseURL: 'https://black-2ers.onrender.com/api'
});

// Este "interceptor" es como un portero:
// Antes de que salga cualquier petición al servidor, 
// revisa si hay un token y lo pega en el encabezado.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;