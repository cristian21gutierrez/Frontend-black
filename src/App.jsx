import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componentes
import Login from "./components/Login";
import Register from "./components/Register"; // Solo dejamos este
import Layout from "./components/Layout";
import Products from "./components/userProducts/Products";
import UserOrders from "./components/userProducts/UserOrders";
import AdminProducts from "./components/adminProduct/AdminProducts";
import AdminOrders from "./components/adminOrders/AdminOrders";
import AdminUsers from "./components/adminUsers/AdminUsers";
// Se eliminó el segundo import de Register que estaba aquí

// 1. Portero de Seguridad
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { auth, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to={auth.role === 'admin' ? "/admin" : "/dashboard"} replace />;
    }

    // Retornamos los hijos envueltos en el Layout
    return <Layout>{children}</Layout>; 
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* RUTAS PÚBLICAS */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-user" element={<Register />} /> 

                    {/* RUTAS DE USUARIO */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/orders"
                        element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <UserOrders />
                            </ProtectedRoute>
                        }
                    />

                    {/* RUTAS DE ADMIN */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminProducts />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminOrders />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
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