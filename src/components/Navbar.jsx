import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../components/styles/Navbar.css";

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [isOpen, setIsOpen] = useState(false); // estado para el menú

    useEffect(() => {
        if (auth && auth.role) {
            setRole(auth.role);
        }
    }, [auth]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderLinks = () => {
        switch (role) {
            case "user":
                return (
                    <>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                            Mis Productos
                        </NavLink>
                        <NavLink to="/user/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                            Mis Pedidos
                        </NavLink>
                    </>
                );
            case "admin":
                return (
                    <>
                        <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                            Administrar Órdenes
                        </NavLink>
                        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
                            Administrar Usuarios
                        </NavLink>
                        <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
                            Administrar Productos
                        </NavLink>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                    ☰
                </button>
                <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                    {renderLinks()}
                </div>
                {auth && (
                    <div className="navbar-logout">
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
