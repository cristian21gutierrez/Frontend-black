import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../components/styles/Navbar.css";

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (auth?.role) {
            setRole(auth.role);
        }
    }, [auth]);

    const handleLogout = () => {
        logout();
        navigate("/");
        setIsMenuOpen(false);
    };

    const renderLinks = () => {
        if (role === "user") {
            return (
                <>
                    <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Mis Productos</NavLink>
                    <NavLink to="/user/orders" onClick={() => setIsMenuOpen(false)}>Mis Pedidos</NavLink>
                </>
            );
        }
        if (role === "admin") {
            return (
                <>
                    <NavLink to="/admin/orders" onClick={() => setIsMenuOpen(false)}>Administrar Órdenes</NavLink>
                    <NavLink to="/admin/users" onClick={() => setIsMenuOpen(false)}>Administrar Usuarios</NavLink>
                    <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Administrar Productos</NavLink>
                </>
            );
        }
        return null;
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
                    ☰
                </button>
                <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                    {renderLinks()}
                    {auth && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
