import React, { useState } from 'react';
import './Sip.css';

const SIPTopUpCalculator = () => {
  const [state, setState] = useState({
    investment: '',
    rate: '',
    tenure: '',
    topUpAmount: '',
    futureValue: 0,
    totalEarnings: 0,
    totalDeposited: 0,
    showResult: false,
    showInflationAdjusted: false
  });

  const calculateSipWithTopUp = () => {
    const parsedInvestment = parseFloat(state.investment.replace(/,/g, '')) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;
    const parsedTopUpAmount = parseFloat(state.topUpAmount.replace(/,/g, '')) || 0;

    let monthlyInvestment = parsedInvestment;
    let totalDeposited = 0;
    let futureValue = 0;
    const monthlyRate = parsedRate / 100 / 12;

    for (let year = 0; year < parsedTenure; year++) {
      for (let month = 0; month < 12; month++) {
        futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
        totalDeposited += monthlyInvestment;
      }
      monthlyInvestment += parsedTopUpAmount;
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

  const handleReset = () => {
    setState({
      investment: '',
      rate: '',
      tenure: '',
      topUpAmount: '',
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
      <div className="calculator-box">
        <h2>SIP with Top-up Calculator</h2>
        <p className="calculator-intro">Calculate your future wealth with yearly SIP top-ups.</p>

        <div className="input-group">
          <label htmlFor="investment">Monthly Investment Amount *</label>
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
            onClick={calculateSipWithTopUp}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPTopUpCalculator;