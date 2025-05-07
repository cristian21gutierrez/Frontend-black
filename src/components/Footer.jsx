import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MiTienda</p>
        <div className="footer-links">
          <a href="/">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
