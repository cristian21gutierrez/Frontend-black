import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // O como se llame tu barra de navegación

const Layout = () => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="content">
                <Outlet /> {/* <-- ¡ESTO ES VITAL! Aquí caerán Products, AdminUsers, etc. */}
            </main>
        </div>
    );
};
export default Layout;