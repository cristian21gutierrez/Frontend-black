import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [role, setRole] = useState("");

    useEffect(() => {
        console.log("Estado de autenticación:", auth); 
        if (auth && auth.role) {
            setRole(auth.role);
        }
    }, [auth]);

    return (
        <nav className="navbar">
            <div className="navbar-links">
                {role === "user" && (
                    <>
                        <Link
                            to="/dashboard"
                            className={location.pathname === "/dashboard" ? "active" : ""}
                        >
                            Mis Productos
                        </Link>
                        <Link
                            to="/user/orders"
                            className={location.pathname === "/user/orders" ? "active" : ""}
                        >
                            Mis Pedidos
                        </Link>
                    </>
                )}

                {role === "admin" && (
                    <>
                        <button
                            onClick={() => navigate("/admin/orders")}
                            className={location.pathname === "/admin/orders" ? "active" : ""}
                        >
                            Administrar Órdenes
                        </button>
                        <button
                            onClick={() => navigate("/admin/users")}
                            className={location.pathname === "/admin/users" ? "active" : ""}
                        >
                            Administrar Usuarios
                        </button>
                        <button
                            onClick={() => navigate("/admin")}
                            className={location.pathname === "/admin" ? "active" : ""}
                        >
                            Administrar Productos
                        </button>
                    </>
                )}
            </div>
            <div className="navbar-logout">
                <button onClick={logout}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;
