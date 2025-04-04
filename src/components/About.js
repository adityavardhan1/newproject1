import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Our Calculators</h1>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to provide simple, accurate, and easy-to-use financial calculators
            to help you make informed investment decisions. Our tools are designed to
            give you a clear understanding of how your investments can grow over time.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Available Calculators</h2>
          
          <div className="calculator-info">
            <h3>Lumpsum Calculator</h3>
            <p>
              The Lumpsum Calculator helps you understand the potential returns on a one-time
              investment. It uses the compound interest formula to calculate how your money
              can grow over time at a given rate of return.
            </p>
            <Link to="/lumpsum" className="try-button">Try Lumpsum Calculator</Link>
          </div>
          
          <div className="calculator-info">
            <h3>SIP Calculator</h3>
            <p>
              The Systematic Investment Plan (SIP) Calculator shows you how regular monthly
              investments can accumulate wealth over time. It's perfect for planning your
              long-term investment strategy with consistent contributions.
            </p>
            <Link to="/sip" className="try-button">Try SIP Calculator</Link>
          </div>
          
          <div className="calculator-info">
            <h3>Time Calculator</h3>
            <p>
              The Time Calculator helps you determine how long it will take to reach your
              investment goals. Simply input your current investment, target amount, and
              expected rate of return to see the time required.
            </p>
            <Link to="/time" className="try-button">Try Time Calculator</Link>
          </div>
        </div>
        
        <div className="about-section">
          <h2>Disclaimer</h2>
          <p>
            These calculators are for educational purposes only and should not be considered
            as financial advice. Investment returns are not guaranteed, and past performance
            does not guarantee future results. Always consult with a qualified financial
            advisor before making investment decisions.
          </p>
        </div>
        
        <div className="about-footer">
          <Link to="/" className="home-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default About; 