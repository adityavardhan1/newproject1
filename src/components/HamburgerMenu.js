import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // If menu is open and click is outside menu content and not on the toggle button
      if (isOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          !event.target.closest('.hamburger-button')) {
        setIsOpen(false);
      }
    };

    // Add event listener to the document
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = (event) => {
    // Prevent the click from being handled by the document click handler
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Handle overlay click to close menu
  const handleOverlayClick = (e) => {
    // Close menu if clicking on the overlay or list items (but not on links)
    if (e.target === overlayRef.current || e.target.tagName === 'LI') {
      setIsOpen(false);
    }
  };

  return (
    <div className="mobile-header">
      <div className="mobile-title">
        <Link to="/">NitiDhan</Link>
      </div>
      <div className="hamburger-menu">
        <button 
          className={`hamburger-button ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <div 
          ref={overlayRef}
          className={`menu-overlay ${isOpen ? 'open' : ''}`}
          onClick={handleOverlayClick}
        >
          <nav className="mobile-nav" ref={menuRef}>
            <ul>
              <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/Calculator" onClick={() => setIsOpen(false)}>Calculators</Link></li>
              <li><Link to="/Market" onClick={() => setIsOpen(false)}>Market</Link></li>
              <li><Link to="/FIRE" onClick={() => setIsOpen(false)}>FIRE</Link></li>
              <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu; 