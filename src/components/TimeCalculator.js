import React, { useState } from 'react';
import '../Sip.css';

function TimeCalculator({ onClose }) {
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
    const rate = parseFloat(state.rate) / 100 || 0;

    if (monthlyInvestment <= 0 || targetAmount <= 0 || rate <= 0) {
      alert('Please enter valid values for all fields.');
      return;
    }

    let totalAmount = 0;
    let time = 0;

    // Calculate using only SIP contributions
    while (totalAmount < targetAmount) {
      totalAmount = totalAmount * (1 + rate / 12) + monthlyInvestment;
      time++;
      if (time > 1000 * 12) {
        alert('Calculation exceeds a realistic time frame. Adjust your values.');
        return;
      }
    }

    setState((prev) => ({ ...prev, requiredTime: time / 12, showResult: true }));
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
    <div className="time-modal">
      <div className="time-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required Time Calculator</h2>
        <p>Calculate the time needed to reach your target amount</p>

        <div className="input-group">
          <label htmlFor="monthlyInvestment">Monthly SIP Amount *</label>
          <input
            type="text"
            id="monthlyInvestment"
            placeholder="Ex: 10000"
            value={state.monthlyInvestment}
            onChange={(e) => handleInputChange(e.target.value, 'monthlyInvestment')}
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
          />
        </div>

        <div className="button-container">
          <button className="calculate-button" onClick={calculateRequiredTime}>Calculate Required Time</button>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>

        {state.showResult && (
          <div className="result-container">
            <p>Required Time: {state.requiredTime.toFixed(1)} years</p>
            <p>Monthly SIP: ₹{parseFloat(state.monthlyInvestment || 0).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseFloat(state.targetAmount || 0).toLocaleString('en-IN')}</p>
            <p>Expected Return: {state.rate}% p.a.</p>
            <p className="note">This is the estimated time needed to reach your target amount.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeCalculator;
