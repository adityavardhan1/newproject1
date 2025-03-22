import React, { useState } from 'react';
import './Sip.css';
import ReverseSipCalculator from './components/ReverseSip';

function SIPCalculator() {
  const [frequency, setFrequency] = useState('monthly');
  const [investment, setInvestment] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [futureValue, setFutureValue] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showInflationAdjusted, setShowInflationAdjusted] = useState(false);
  const [showReverseSip, setShowReverseSip] = useState(false);

  const calculateSip = () => {
    const parsedInvestment = parseFloat(investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    if (parsedInvestment <= 0 || parsedRate <= 0 || parsedTenure <= 0) {
      alert('Please enter valid positive numbers for all fields');
      return;
    }

    let schedule = 12;  // Monthly
    switch (frequency) {
      case 'monthly':
        schedule = 12;
        break;
      case 'quarterly':
        schedule = 4;
        break;
      case 'half-yearly':
        schedule = 2;
        break;
      case 'annually':
        schedule = 1;
        break;
      default:
        schedule = 12;
    }

    const r = parsedRate / 100 / schedule;
    const n = parsedTenure * schedule;
    const a = parsedInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalDepositedCalc = parsedInvestment * n;
    const totalEarningsCalc = a - totalDepositedCalc;

    setFutureValue(a);
    setTotalEarnings(totalEarningsCalc);
    setTotalDeposited(totalDepositedCalc);
    setShowResult(true);
    setShowInflationAdjusted(false);
  };

  const formatAmount = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Crores`;
    } else {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
  };

  const calculateInflationAdjusted = (amount) => {
    const inflationRate = 0.07;
    const years = parseFloat(tenure) || 0;
    const adjustedAmount = amount / Math.pow(1 + inflationRate, years);
    return formatAmount(adjustedAmount);
  };

  const handleReset = () => {
    setInvestment('');
    setRate('');
    setTenure('');
    setShowResult(false);
    setShowInflationAdjusted(false);
  };

  const handleInputChange = (value, setter) => {
    setter(value);
    if (showResult) {
      setShowInflationAdjusted(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="center">SIP Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <h2>Systematic Investment Plan (SIP) Calculator</h2>
            <p>Calculate your future wealth using our SIP Calculator.</p>

            <div className="input-group">
              <label htmlFor="frequency">Frequency of Investment:</label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => handleInputChange(e.target.value, setFrequency)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="investment">Monthly Investment Amount *</label>
              <input
                type="text"
                id="investment"
                placeholder="Ex: 10000"
                value={investment}
                onChange={(e) => handleInputChange(e.target.value, setInvestment)}
                autoComplete="off"
              />
            </div>

            <div className="input-group">
              <label htmlFor="rate">Expected rate of return (P.A) *</label>
              <input
                type="text"
                id="rate"
                placeholder="Ex: 12"
                value={rate}
                onChange={(e) => handleInputChange(e.target.value, setRate)}
                autoComplete="off"
              />
            </div>

            <div className="input-group">
              <label htmlFor="tenure">Tenure (in years) (Up to 50 years)</label>
              <input
                type="text"
                id="tenure"
                placeholder="Ex: 10"
                value={tenure}
                onChange={(e) => handleInputChange(e.target.value, setTenure)}
                autoComplete="off"
              />
            </div>

            <div className="button-container">
              <button 
                className="calculate-button" 
                onClick={calculateSip}
                disabled={!investment || !rate || !tenure}
              >
                Plan My Wealth
              </button>
              <button className="reset-button" onClick={handleReset}>
                Reset
              </button>
            </div>

            {showResult && (
              <div className="result-container">
                <p>Your Future Value: {formatAmount(futureValue)}</p>
                <p>Total Earnings: {formatAmount(totalEarnings)}</p>
                <p>Total Amount Deposited: {formatAmount(totalDeposited)}</p>
                
                <div className="inflation-section">
                  <button 
                    className="inflation-button"
                    onClick={() => setShowInflationAdjusted(!showInflationAdjusted)}
                  >
                    {showInflationAdjusted ? "Hide" : "Show"} Inflation Adjusted Value
                  </button>
                  
                  {showInflationAdjusted && (
                    <div className="inflation-results">
                      <p>Inflation Adjusted Future Value (7% p.a.):</p>
                      <p>{calculateInflationAdjusted(futureValue)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-right">
            <div className="sidebar-content">
              <h3>What is SIP?</h3>
              <p>Systematic Investment Plan (SIP) is a smart financial planning tool that helps you to create wealth, by investing small sums of money every month, over a period of time.</p>
              
              <button 
                className="reverse-sip-button"
                onClick={() => setShowReverseSip(!showReverseSip)}
              >
                {showReverseSip ? 'Hide' : 'Show'} Target Amount Calculator
              </button>

              <h3>Other Options</h3>
              <ul>
                <li><a href="#">Benefits of SIP</a></li>
                <li><a href="#">Types of SIP</a></li>
                <li><a href="#">Tax Implications</a></li>
                <li><a href="#">Tips for SIP</a></li>
              </ul>
            </div>
          </div>
          
          {showReverseSip && <ReverseSipCalculator onClose={() => setShowReverseSip(false)} />}
        </div>
      </div>
    </div>
  );
}

export default SIPCalculator;