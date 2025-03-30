import React, { useState } from 'react';
import './Sip.css';

function SIPTopUpCalculator() {
  const [state, setState] = useState({
    investment: '',
    rate: '',
    tenure: '',
    topUpAmount: '',
    topUpFrequency: 'yearly',
    futureValue: 0,
    totalEarnings: 0,
    totalDeposited: 0,
    showResult: false,
    showInflationAdjusted: false
  });

  const calculateTopUpSip = () => {
    const parsedInvestment = parseFloat(state.investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;
    const parsedTopUpAmount = parseFloat(state.topUpAmount) || 0;

    let futureValue = 0;
    let totalDeposited = 0;
    let monthlyInvestment = parsedInvestment;
    const monthlyRate = parsedRate / 12 / 100;

    for (let year = 0; year < parsedTenure; year++) {
      for (let month = 0; month < 12; month++) {
        futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
        totalDeposited += monthlyInvestment;
      }
      // Apply top-up at the beginning of each year
      if (state.topUpFrequency === 'yearly') {
        monthlyInvestment += parsedTopUpAmount;
      }
    }

    setState(prev => ({
      ...prev,
      futureValue,
      totalEarnings: futureValue - totalDeposited,
      totalDeposited,
      showResult: true
    }));
  };

  const formatAmount = (num) => {
    return num >= 10000000 
      ? `₹${(num / 10000000).toFixed(2)} Cr` 
      : `₹${(num / 100000).toFixed(2)} Lakh`;
  };

  const calculateInflationAdjusted = (amount) => {
    const inflationRate = 0.07;
    const years = parseFloat(state.tenure) || 0;
    return formatAmount(amount / Math.pow(1 + inflationRate, years));
  };

  const handleReset = () => {
    setState({
      investment: '',
      rate: '',
      tenure: '',
      topUpAmount: '',
      topUpFrequency: 'yearly',
      futureValue: 0,
      totalEarnings: 0,
      totalDeposited: 0,
      showResult: false,
      showInflationAdjusted: false
    });
  };

  const handleInputChange = (value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="main-container">
      <h1 className="center">SIP Top-up Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>SIP with Annual Top-up Calculator</h2>
              <p className="calculator-intro">Calculate your future wealth with regular SIP top-ups.</p>

              <div className="input-group">
                <label htmlFor="investment">Monthly SIP Amount *</label>
                <input
                  type="text"
                  id="investment"
                  placeholder="Ex: 10000"
                  value={state.investment}
                  onChange={(e) => handleInputChange(e.target.value, 'investment')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="topUpAmount">Yearly Top-up Amount *</label>
                <input
                  type="text"
                  id="topUpAmount"
                  placeholder="Ex: 1000"
                  value={state.topUpAmount}
                  onChange={(e) => handleInputChange(e.target.value, 'topUpAmount')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="rate">Expected Rate of Return (P.A) *</label>
                <input
                  type="text"
                  id="rate"
                  placeholder="Ex: 12"
                  value={state.rate}
                  onChange={(e) => handleInputChange(e.target.value, 'rate')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="tenure">Time Period (in years) *</label>
                <input
                  type="text"
                  id="tenure"
                  placeholder="Ex: 10"
                  value={state.tenure}
                  onChange={(e) => handleInputChange(e.target.value, 'tenure')}
                  autoComplete="off"
                />
              </div>

              <div className="button-container">
                <button 
                  className="calculate-button" 
                  onClick={calculateTopUpSip}
                  disabled={!state.investment || !state.rate || !state.tenure || !state.topUpAmount}
                >
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <p>Future Value: {formatAmount(state.futureValue)}</p>
                  <p>Total Earnings: {formatAmount(state.totalEarnings)}</p>
                  <p>Total Amount Invested: {formatAmount(state.totalDeposited)}</p>
                  <button 
                    className="inflation-button" 
                    onClick={() => setState(prev => ({ 
                      ...prev, 
                      showInflationAdjusted: !prev.showInflationAdjusted 
                    }))}
                  >
                    {state.showInflationAdjusted ? 'Hide' : 'Show'} Inflation Adjusted Value
                  </button>
                  {state.showInflationAdjusted && (
                    <p>
                      Inflation Adjusted Future Value (7% p.a.): 
                      {calculateInflationAdjusted(state.futureValue)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-right">
            <h3 className="sidebar-heading">What is SIP Top-up?</h3>
            <div className="sidebar-content">
              <p>
                SIP Top-up is a facility that allows you to increase your SIP investment amount 
                periodically. This helps you to invest more as your income grows over time.
              </p>
              <ul>
                <li>Helps create larger corpus</li>
                <li>Matches growing income</li>
                <li>Better returns potential</li>
                <li>Disciplined investing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SIPTopUpCalculator;