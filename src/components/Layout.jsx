import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="content">{children || <Outlet />}</main>
        </div>
    );
};

export default Layout;
