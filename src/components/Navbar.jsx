import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../components/styles/Navbar.css";

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    useEffect(() => {
        if (auth && auth.role) {
            setRole(auth.role);
        }
    }, [auth]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const renderLinks = () => {
        switch (role) {
            case "user":
                return (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => (isActive ? "active" : "")}
                            aria-label="Ir al Dashboard"
                        >
                            Mis Productos
                        </NavLink>
                        <NavLink
                            to="/user/orders"
                            className={({ isActive }) => (isActive ? "active" : "")}
                            aria-label="Mis Pedidos"
                        >
                            Mis Pedidos
                        </NavLink>
                    </>
                );
            case "admin":
                return (
                    <>
                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) => (isActive ? "active" : "")}
                            aria-label="Administrar Órdenes"
                        >
                            Administrar Órdenes
                        </NavLink>
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) => (isActive ? "active" : "")}
                            aria-label="Administrar Usuarios"
                        >
                            Administrar Usuarios
                        </NavLink>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) => (isActive ? "active" : "")}
                            aria-label="Administrar Productos"
                        >
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
            <div className="navbar-links">
                {renderLinks()}
            </div>
            {auth && (
                <div className="navbar-logout">
                    <button onClick={handleLogout} aria-label="Cerrar sesión">
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
