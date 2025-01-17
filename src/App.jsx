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
