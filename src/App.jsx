import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componentes
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Products from "./components/userProducts/Products";
import UserOrders from "./components/userProducts/UserOrders";
import AdminProducts from "./components/adminProduct/AdminProducts";
import AdminOrders from "./components/adminOrders/AdminOrders";
import AdminUsers from "./components/adminUsers/AdminUsers";

// 1. Portero de Seguridad (Mejorado con Roles)
const ProtectedRoute = ({ allowedRoles }) => {
    const { auth, loading } = useAuth();

    if (loading) return <div>Cargando...</div>; // Evita redirecciones falsas

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        // Si el usuario no tiene el rol, lo mandamos a su home correspondiente
        return <Navigate to={auth.role === 'admin' ? "/admin" : "/dashboard"} replace />;
    }

    return <Layout />; // El Layout contiene el <Outlet /> para las rutas hijas
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

                    {/* RUTAS DE CLIENTE (Cualquier usuario logueado) */}
                    <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                        <Route path="/dashboard" element={<Products />} />
                        <Route path="/user/orders" element={<UserOrders />} />
                    </Route>

                    {/* RUTAS DE ADMIN (Solo administradores) */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/admin" element={<AdminProducts />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                    </Route>

                    {/* 404 - Opcional */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;