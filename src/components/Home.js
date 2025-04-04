import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Investment Calculators</h1>
        <p className="home-description">
          Make informed investment decisions with our suite of financial calculators.
          Plan your investments, understand returns, and achieve your financial goals.
        </p>
        
        <div className="calculator-cards">
          <Link to="/lumpsum" className="calculator-card">
            <h2>Lumpsum Calculator</h2>
            <p>Calculate returns on one-time investments with compound interest.</p>
          </Link>
          
          <Link to="/sip" className="calculator-card">
            <h2>SIP Calculator</h2>
            <p>Plan your Systematic Investment Plan and see how regular investments grow over time.</p>
          </Link>
          
          <Link to="/time" className="calculator-card">
            <h2>Time Calculator</h2>
            <p>Determine how long it will take to reach your investment goals.</p>
          </Link>
        </div>
        
        <div className="home-footer">
          <p>Start planning your financial future today!</p>
          <Link to="/about" className="about-link">Learn more about our calculators</Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 