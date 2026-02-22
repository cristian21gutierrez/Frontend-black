import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/styles/Navbar.css';

const Navbar = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderLinks = () => {
        switch (auth.role) {
            case 'user':
                return (
                    <>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')} aria-label="Ir al Dashboard">
                            Mis Productos
                        </NavLink>
                        <NavLink to="/user/orders" className={({ isActive }) => (isActive ? 'active' : '')} aria-label="Mis Pedidos">
                            Mis Pedidos
                        </NavLink>
                    </>
                );
            case 'admin':
                return (
                    <>
                        <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')} aria-label="Administrar Órdenes">
                            Administrar Órdenes
                        </NavLink>
                        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')} aria-label="Administrar Usuarios">
                            Administrar Usuarios
                        </NavLink>
                        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')} aria-label="Administrar Productos">
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
            <div className="navbar-links">{renderLinks()}</div>
            {auth.isAuthenticated && (
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
