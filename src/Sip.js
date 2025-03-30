import React, { useState } from 'react';
import './Sip.css';
import ReverseSipCalculator from './components/ReverseSip';

function SIPCalculator() {
  const [state, setState] = useState({
    frequency: 'monthly',
    investment: '',
    rate: '',
    tenure: '',
    futureValue: 0,
    totalEarnings: 0,
    totalDeposited: 0,
    showResult: false,
    showInflationAdjusted: false,
    showReverseSip: false,
    showCagrCalculator: false,
    showTimeCalculator: false
  });

  const calculateSip = () => {
    const parsedInvestment = parseFloat(state.investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;

    const schedule = 12; // Monthly
    const r = parsedRate / 100 / schedule;
    const n = parsedTenure * schedule;
    const a = parsedInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalDepositedCalc = parsedInvestment * n;
    const totalEarningsCalc = a - totalDepositedCalc;

    setState(prev => ({
      ...prev,
      futureValue: a,
      totalEarnings: totalEarningsCalc,
      totalDeposited: totalDepositedCalc,
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
      frequency: 'monthly',
      investment: '',
      rate: '',
      tenure: '',
      futureValue: 0,
      totalEarnings: 0,
      totalDeposited: 0,
      showResult: false,
      showInflationAdjusted: false,
      showReverseSip: false,
      showCagrCalculator: false,
      showTimeCalculator: false
    });
  };

  const handleInputChange = (value, field) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="main-container">
      <h1 className="center">SIP Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>Systematic Investment Plan (SIP) Calculator</h2>
              <p className="calculator-intro">Calculate your future wealth using our SIP Calculator.</p>

              <div className="input-group">
                <label htmlFor="frequency">Frequency of Investment:</label>
                <select
                  id="frequency"
                  value={state.frequency}
                  onChange={(e) => handleInputChange(e.target.value, 'frequency')}
                >
                  <option value="monthly">Monthly</option>
                </select>
              </div>

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
                  onClick={calculateSip}
                  disabled={!state.investment || !state.rate || !state.tenure}
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
                  <p>Total Amount Deposited: {formatAmount(state.totalDeposited)}</p>
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

          {showReverseSip && <ReverseSipCalculator onClose={() => setShowReverseSip(false)} />}

          <div className="sidebar-right">
            <h3 className="sidebar-heading">Already know your goal amount?</h3>
            <button 
              className="reverse-sip-button" 
              onClick={() => setState(prev => ({ 
                ...prev, 
                showReverseSip: !prev.showReverseSip 
              }))}
            >
              {state.showReverseSip ? 'Hide Required Investment Calculator' : 'Know Your Required Investment'}
            </button>
            <button 
              className="cagr-button" 
              onClick={() => setState(prev => ({ 
                ...prev, 
                showCagrCalculator: !prev.showCagrCalculator 
              }))}
            >
              {state.showCagrCalculator ? 'Hide Required CAGR Calculator' : 'Know Your Required CAGR'}
            </button>
            <button 
              className="time-button" 
              onClick={() => setState(prev => ({ 
                ...prev, 
                showTimeCalculator: !prev.showTimeCalculator 
              }))}
            >
              {state.showTimeCalculator ? 'Hide Required Time Calculator' : 'Know Your Required Time'}
            </button>
          </div>
        </div>

        {state.showReverseSip && (
          <ReverseSipCalculator 
            onClose={() => setState(prev => ({ ...prev, showReverseSip: false }))} 
          />
        )}
        {state.showCagrCalculator && (
          <CagrCalculator 
            onClose={() => setState(prev => ({ ...prev, showCagrCalculator: false }))} 
          />
        )}
        {state.showTimeCalculator && (
          <TimeCalculator 
            onClose={() => setState(prev => ({ ...prev, showTimeCalculator: false }))} 
          />
        )}
      </div>
    </div>
  );
}

export default SIPCalculator;