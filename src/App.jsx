import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Products from "./components/userProducts/Products";
import UserOrders from "./components/userProducts/UserOrders";
import AdminProducts from "./components/AdminProducts";
import AdminOrders from "./components/AdminOrders";
import AdminUsers from "./components/AdminUsers";

// Ruta protegida
const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    // Redirige al login si no está autenticado
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
                    {/* Ruta base que redirige al login */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Products />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/orders"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <UserOrders />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <AdminProducts />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <AdminOrders />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <AdminUsers />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
