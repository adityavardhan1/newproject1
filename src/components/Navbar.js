import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculators = [
    { name: 'SIP Calculator', path: '/Calculator/SipCalculator' },
    { name: 'Lumpsum Calculator', path: '/Calculator/LumpsumCalculator' },
    { name: 'Time Duration Calculator - One Time Investment', path: '/Calculator/TimeCalculator' },
    { name: 'Time Duration Calculator - Regular Investment', path: '/Calculator/StepupTimeCalculator' },
    { name: 'CAGR Calculator', path: '/Calculator/CagrCalculator' },
    { name: 'Lumpsum CAGR Calculator', path: '/Calculator/LumpsumCagrCalculator' },
    { name: 'One-Time Investment Calculator', path: '/Calculator/OneTimeInvestmentCalculator' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">NitiDhan</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/Calculator" className="nav-link">Calculators</Link>
          </li>
          <li className="nav-item">
            <Link to="/Market" className="nav-link">Market</Link>
          </li>
          <li className="nav-item">
            <Link to="/FIRE" className="nav-link">FIRE</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;