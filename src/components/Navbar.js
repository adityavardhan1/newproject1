import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleCalculatorClick = () => {
    setShowDropdown(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <h1 className="Logo">NitiDhan</h1>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/ContactUs">Support Us</Link>
        <Link to="/AskUs">Ask Us</Link>
        <div 
          className="calculator-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Link to="/Calculator">Calculator</Link>
          {showDropdown && (
            <div className="dropdown-content">
              {calculators.map(calc => (
                <Link 
                  key={calc.path} 
                  to={calc.path}
                  onClick={handleCalculatorClick}
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/FIRE">F.I.R.E</Link>
        <Link to="/Market">Market</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Sign Up</Link>
      </div>
    </nav>
  );
}