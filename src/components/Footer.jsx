import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./styles/Footer.css"; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="line"></div> 
            <p>&copy; {new Date().getFullYear()} Mi Aplicación - Todos los derechos reservados</p>
            
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
        </footer>
    );
};

export default Footer;
