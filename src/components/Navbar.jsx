import React from 'react';
import { FaPhone, FaEnvelope, FaShoppingBag, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <FaShoppingBag className="brand-icon" />
          <div className="brand-text">
            <h1>Smart Pick</h1>
            <p>AI Shopping Assistant</p>
          </div>
        </div>
        
        <div className="navbar-actions">
          <div className="navbar-contact">
            <a href="tel:03201007448" className="contact-icon-link" title="Call: 0320-1007448">
              <FaPhone className="contact-icon" />
            </a>
            <a href="mailto:adsab2522@gmail.com" className="contact-icon-link" title="Email: adsab2522@gmail.com">
              <FaEnvelope className="contact-icon" />
            </a>
            <a href="https://wa.me/923201007448" className="contact-icon-link" title="WhatsApp" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="contact-icon" />
            </a>
          </div>
          
          <div className="navbar-divider"></div>
          
          <div className="navbar-social">
            <a href="https://facebook.com/yourpage" className="social-icon-link" title="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com/yourpage" className="social-icon-link" title="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;