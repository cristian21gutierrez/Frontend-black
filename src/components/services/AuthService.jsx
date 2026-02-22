import api from '../../api/config';

const AuthService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/users', userData);
        return response.data;
    },
};

export default AuthService;
