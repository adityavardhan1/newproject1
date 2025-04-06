import React from 'react';
import { Link } from 'react-router-dom';
import './Calculator.css';

function Calculator() {
  return (
    <div className="calculator-hub">
      <h1>Investment Calculators</h1>
      <p className="hub-description">
        Choose the calculator that best suits your investment needs
      </p>
      
      <div className="calculator-grid">
        <Link to="/Calculator/SipCalculator" className="calculator-card">
          <div className="calculator-icon">💰</div>
          <h2>SIP Calculator</h2>
          <p>Calculate returns on your systematic investment plan</p>
        </Link>

        <Link to="/Calculator/LumpsumCalculator" className="calculator-card">
          <div className="calculator-icon">💎</div>
          <h2>Lumpsum Calculator</h2>
          <p>Calculate returns on your one-time investment</p>
        </Link>

        <Link to="/Calculator/OneTimeInvestmentCalculator" className="calculator-card">
          <div className="calculator-icon">🎯</div>
          <h2>One-Time Investment Return Calculator</h2>
          <p>Calculate returns on your one-time investment with detailed breakdown</p>
        </Link>

        <Link to="/Calculator/TimeCalculator" className="calculator-card">
          <div className="calculator-icon">⏳</div>
          <h2>Time Duration Calculator - One Time Investment</h2>
          <p>Calculate time needed for your one-time investment goal</p>
        </Link>

        <Link to="/Calculator/StepupTimeCalculator" className="calculator-card">
          <div className="calculator-icon">🔄</div>
          <h2>Time Duration Calculator - Regular Investment</h2>
          <p>Calculate time needed for your regular investment goal</p>
        </Link>

        <Link to="/Calculator/CagrCalculator" className="calculator-card">
          <div className="calculator-icon">📊</div>
          <h2>CAGR Calculator</h2>
          <p>Calculate Compound Annual Growth Rate for your investments</p>
        </Link>

        <Link to="/Calculator/LumpsumCagrCalculator" className="calculator-card">
          <div className="calculator-icon">📈</div>
          <h2>Lumpsum CAGR Calculator</h2>
          <p>Calculate CAGR for your one-time investments</p>
        </Link>
        
        <Link to="/Calculator/EmiCalculator" className="calculator-card">
          <div className="calculator-icon">🏠</div>
          <h2>EMI Calculator</h2>
          <p>Calculate Equated Monthly Installment for loans</p>
        </Link>
        
        <Link to="/Calculator/SwpCalculator" className="calculator-card">
          <div className="calculator-icon">💸</div>
          <h2>SWP Calculator</h2>
          <p>Calculate Systematic Withdrawal Plan for regular income</p>
        </Link>
      </div>
    </div>
  );
}

export default Calculator;
