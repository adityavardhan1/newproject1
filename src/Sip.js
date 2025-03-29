import React, { useState } from 'react';
import './Sip.css';
import ReverseSipCalculator from './components/ReverseSip';
import CagrCalculator from './components/CagrCalculator';
import TimeCalculator from './components/TimeCalculator';

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
  const [showCagrCalculator, setShowCagrCalculator] = useState(false);
  const [showTimeCalculator, setShowTimeCalculator] = useState(false);

  const calculateSip = () => {
    const parsedInvestment = parseFloat(investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    if (parsedInvestment <= 0 || parsedRate <= 0 || parsedTenure <= 0) {
      alert('Please enter valid positive numbers for all fields');
      return;
    }

    let schedule = 12;
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
        schedule = 12; // Default to monthly if unknown frequency
        break;
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

  const formatAmount = (num) => num >= 10000000 ? `₹${(num / 10000000).toFixed(2)} Cr` : `₹${(num / 100000).toFixed(2)} Lakh`;

  const calculateInflationAdjusted = (amount) => {
    const inflationRate = 0.07;
    const years = parseFloat(tenure) || 0;
    return formatAmount(amount / Math.pow(1 + inflationRate, years));
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
      calculateSip();
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
              <select id="frequency" value={frequency} onChange={(e) => handleInputChange(e.target.value, setFrequency)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="investment">Monthly Investment Amount *</label>
              <input type="text" id="investment" placeholder="Ex: 10000" value={investment} onChange={(e) => handleInputChange(e.target.value, setInvestment)} />
            </div>

            <div className="input-group">
              <label htmlFor="rate">Expected Rate of Return (P.A) *</label>
              <input type="text" id="rate" placeholder="Ex: 12" value={rate} onChange={(e) => handleInputChange(e.target.value, setRate)} />
            </div>

            <div className="input-group">
              <label htmlFor="tenure">Tenure (in years) *</label>
              <input type="text" id="tenure" placeholder="Ex: 10" value={tenure} onChange={(e) => handleInputChange(e.target.value, setTenure)} />
            </div>

            <div className="button-container">
              <button className="calculate-button" onClick={calculateSip}>Calculate</button>
              <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>

            {showResult && (
              <div className="result-container">
                <p>Your Future Value: {formatAmount(futureValue)}</p>
                <p>Total Earnings: {formatAmount(totalEarnings)}</p>
                <p>Total Amount Deposited: {formatAmount(totalDeposited)}</p>
                <button className="inflation-button" onClick={() => setShowInflationAdjusted(!showInflationAdjusted)}>
                  {showInflationAdjusted ? "Hide" : "Show"} Inflation Adjusted Value
                </button>
                {showInflationAdjusted && <p>Inflation Adjusted Future Value (7% p.a.): {calculateInflationAdjusted(futureValue)}</p>}
              </div>
            )}
          </div>

          <div className="sidebar-right">
            <h3 className="sidebar-heading">Already know your goal amount?</h3>
            <button className="reverse-sip-button" onClick={() => setShowReverseSip(!showReverseSip)}>
              {showReverseSip ? 'Hide Required SIP Calculator' : 'Know Your Required SIP Amount'}
            </button>
            <button className="cagr-button" onClick={() => setShowCagrCalculator(!showCagrCalculator)}>
              {showCagrCalculator ? 'Hide Required CAGR Calculator' : 'Know Your Required CAGR'}
            </button>
            <button className="time-button" onClick={() => setShowTimeCalculator(!showTimeCalculator)}>
              {showTimeCalculator ? 'Hide Required Time Calculator' : 'Know Your Required Time'}
            </button>
          </div>

          {showReverseSip && <ReverseSipCalculator onClose={() => setShowReverseSip(false)} />}
          {showCagrCalculator && <CagrCalculator onClose={() => setShowCagrCalculator(false)} />}
          {showTimeCalculator && <TimeCalculator onClose={() => setShowTimeCalculator(false)} />}
        </div>
      </div>
    </div>
  );
}

export default SIPCalculator;