import React, { useState } from 'react';
import '../Sip.css';

function CagrCalculator({ onClose }) {
  const initialState = {
    monthlyInvestment: '',
    targetAmount: '',
    tenure: '',
    requiredCagr: null,
    showResult: false,
    errorMessage: '',
  };

  const [state, setState] = useState(initialState);

  const calculateRequiredCagr = () => {
    const monthlyInvestment = parseFloat(state.monthlyInvestment.replace(/,/g, '')) || 0;
    const targetAmount = parseFloat(state.targetAmount.replace(/,/g, '')) || 0;
    const tenure = parseFloat(state.tenure) || 0;

    if (monthlyInvestment <= 0 || targetAmount <= 0 || tenure <= 0) {
      setState((prev) => ({ ...prev, errorMessage: 'Please enter valid values for all fields.' }));
      return;
    }

    let left = -500;
    let right = 500;
    const maxIterations = 100;
    let iterations = 0;

    const n = tenure * 12;

    while (iterations < maxIterations) {
      const mid = (left + right) / 2;
      const r = mid / 100 / 12;

      // Handle the case when r is 0 to avoid division by zero
      let futureValue = 0;
      if (r === 0) {
        futureValue = monthlyInvestment * n;
      } else {
        futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      }

      if (Math.abs(futureValue - targetAmount) < 0.01) {
        setState((prev) => ({ ...prev, requiredCagr: mid, showResult: true, errorMessage: '' }));
        return;
      }

      if (futureValue < targetAmount) {
        left = mid;
      } else {
        right = mid;
      }
      iterations++;
    }

    setState((prev) => ({ ...prev, errorMessage: 'Calculation failed. Try adjusting the values.' }));
  };

  const handleInputChange = (value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleReset = () => {
    setState(initialState);
  };

  return (
    <div className="cagr-modal">
      <div className="cagr-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required CAGR Calculator</h2>
        <p>Calculate the required growth rate to reach your target amount with SIP</p>

        <div className="input-group">
          <label htmlFor="monthlyInvestment">Monthly SIP Amount *</label>
          <input
            type="text"
            id="monthlyInvestment"
            placeholder="Ex: 10000"
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
            onClick={calculateRequiredCagr}
            disabled={!state.monthlyInvestment || !state.targetAmount || !state.tenure}
          >
            Calculate Required CAGR
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {state.errorMessage && <p className="error-message">{state.errorMessage}</p>}

        {state.showResult && state.requiredCagr !== null && (
          <div className="result-container">
            <p>Required CAGR: {state.requiredCagr.toFixed(2)}% p.a.</p>
            <p>Monthly SIP: ₹{parseFloat(state.monthlyInvestment).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseFloat(state.targetAmount).toLocaleString('en-IN')}</p>
            <p>Time Period: {state.tenure} years</p>
            <p className="note">This is the required annual growth rate to reach your target amount with regular monthly SIP.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CagrCalculator;