import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../components/styles/Navbar.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (auth && auth.role) {
      setRole(auth.role);
    }

    // Detectar el scroll para cambiar la transparencia del navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [auth]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const renderLinks = () => {
    switch (role) {
      case "user":
        return (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Mis Productos
            </NavLink>
            <NavLink to="/user/orders" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Mis Pedidos
            </NavLink>
          </>
        );
      case "admin":
        return (
          <>
            <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Administrar Órdenes
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Administrar Usuarios
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Administrar Productos
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {renderLinks()}
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
