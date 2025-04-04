import React, { useState } from 'react';
import '../Sip.css';

function TimeCalculator() {
  const initialState = {
    monthlyInvestment: '',
    targetAmount: '',
    rate: '',
    requiredTime: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [state, setState] = useState(initialState);

  const calculateRequiredTime = () => {
    const monthlyInvestment = parseFloat(state.monthlyInvestment.replace(/,/g, '')) || 0;
    const targetAmount = parseFloat(state.targetAmount.replace(/,/g, '')) || 0;
    const rate = parseFloat(state.rate) || 0;

    if (monthlyInvestment <= 0 || targetAmount <= 0 || rate <= 0) {
      return;
    }

    const r = rate / 100 / 12;
    const P = monthlyInvestment;
    const A = targetAmount;

    // Using logarithm to solve for n in the SIP formula
    const n = Math.log(1 + (A * r) / (P * (1 + r))) / Math.log(1 + r);
    
    setState(prev => ({
      ...prev,
      requiredTime: n / 12,
      showResult: true
    }));
  };

  const handleInputChange = (value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleReset = () => {
    setState(initialState);
  };

  const formatTime = (years) => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    
    if (months === 12) {
      return `${wholeYears + 1} years`;
    }
    
    if (wholeYears === 0) {
      return `${months} months`;
    }
    
    return months > 0 ? `${wholeYears} years ${months} months` : `${wholeYears} years`;
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>Time Duration Calculator - One Time Investment</h2>
              <p className="calculator-intro">Calculate time needed to reach your target amount with one-time investment</p>

              <div className="input-group">
                <label htmlFor="monthlyInvestment">Investment Amount *</label>
                <input
                  type="text"
                  id="monthlyInvestment"
                  placeholder="Ex: 100000"
                  value={state.monthlyInvestment}
                  onChange={(e) => handleInputChange(e.target.value, 'monthlyInvestment')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="targetAmount">Target Amount *</label>
                <input
                  type="text"
                  id="targetAmount"
                  placeholder="Ex: 1000000"
                  value={state.targetAmount}
                  onChange={(e) => handleInputChange(e.target.value, 'targetAmount')}
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

              <div className="button-container">
                <button 
                  className="calculate-button"
                  onClick={calculateRequiredTime}
                  disabled={!state.monthlyInvestment || !state.targetAmount || !state.rate}
                >
                  Calculate Required Time
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <h2>Results</h2>
                  <p>Required Time: {formatTime(state.requiredTime)}</p>
                  <p>Investment Amount: ₹{parseFloat(state.monthlyInvestment).toLocaleString('en-IN')}</p>
                  <p>Target Amount: ₹{parseFloat(state.targetAmount).toLocaleString('en-IN')}</p>
                  <p>Expected Return Rate: {state.rate}% p.a.</p>
                  <p className="note">This is the time required to reach your target amount with a one-time investment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeCalculator;