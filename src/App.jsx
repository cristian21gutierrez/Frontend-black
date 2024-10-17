import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import AdminProducts from './components/AdminProducts';
import Products from './components/userProducts/Products';
import AdminOrders from './components/AdminOrders';
import UserOrders from './components/userProducts/UserOrders'; 
import AdminUsers from './components/AdminUsers';
import CreateUser from './components/CreateUser';

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminProducts />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute>
                                <AdminOrders />
                            </ProtectedRoute>
                        }
                    />
                    {/* Nueva ruta para que el usuario vea sus pedidos */}
                    <Route
                        path="/user/orders"
                        element={
                            <ProtectedRoute>
                                <UserOrders />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute>
                                <AdminUsers />
                            </ProtectedRoute>
                        }
                    />

                    
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
