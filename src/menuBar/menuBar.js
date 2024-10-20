import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menuBar.css';

function MenuBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Функція для прокрутки сторінки до верху
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h3>Veronika Shestakova</h3>
          <span className="violin-text">Violin</span>
        </div>
        {/* Основне меню (стаціонарне) */}
        <div className="navbar-menu">
          <ul>
            <li>
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>
            <li className="separator">•</li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li className="separator">•</li>
            <li><Link to="/info">Info</Link></li>
            <li className="separator">•</li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        {/* Кнопка для бургер-меню */}
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Повноекранне меню (адаптивне) */}
      {menuOpen && (
        <div className="fullscreen-menu">
          <button className="close-button" onClick={closeMenu}>✕</button>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li><Link to="/portfolio" onClick={closeMenu}>Portfolio</Link></li>
            <li><Link to="/info" onClick={closeMenu}>Info</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
