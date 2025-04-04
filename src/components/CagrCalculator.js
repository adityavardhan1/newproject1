import React, { useState } from 'react';
import '../Sip.css';

function CagrCalculator() {
  const initialState = {
    initialValue: '',
    finalValue: '',
    timePeriod: '',
    cagr: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [state, setState] = useState(initialState);

  const calculateCAGR = () => {
    const initialValue = parseFloat(state.initialValue.replace(/,/g, '')) || 0;
    const finalValue = parseFloat(state.finalValue.replace(/,/g, '')) || 0;
    const timePeriod = parseFloat(state.timePeriod) || 0;

    if (initialValue <= 0 || finalValue <= 0 || timePeriod <= 0) {
      return;
    }

    // CAGR = (Final Value / Initial Value)^(1/n) - 1
    const cagr = (Math.pow(finalValue / initialValue, 1 / timePeriod) - 1) * 100;
    
    setState(prev => ({
      ...prev,
      cagr: cagr,
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

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="calculator-header">
          <h1>CAGR Calculator</h1>
          <p className="calculator-description">Calculate the Compound Annual Growth Rate of your investments</p>
        </div>

        <div className="calculator-content">
          <div className="input-group">
            <label htmlFor="initialValue">Initial Investment Value *</label>
            <input
              type="text"
              id="initialValue"
              placeholder="Ex: 100000"
              value={state.initialValue}
              onChange={(e) => handleInputChange(e.target.value, 'initialValue')}
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="finalValue">Final Investment Value *</label>
            <input
              type="text"
              id="finalValue"
              placeholder="Ex: 200000"
              value={state.finalValue}
              onChange={(e) => handleInputChange(e.target.value, 'finalValue')}
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="timePeriod">Time Period (in years) *</label>
            <input
              type="text"
              id="timePeriod"
              placeholder="Ex: 5"
              value={state.timePeriod}
              onChange={(e) => handleInputChange(e.target.value, 'timePeriod')}
              autoComplete="off"
            />
          </div>

          <div className="button-container">
            <button 
              className="calculate-button"
              onClick={calculateCAGR}
              disabled={!state.initialValue || !state.finalValue || !state.timePeriod}
            >
              Calculate CAGR
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>

          {state.showResult && (
            <div className="result-container">
              <h2>Results</h2>
              <p>CAGR: {state.cagr.toFixed(2)}%</p>
              <p>Initial Investment: ₹{parseFloat(state.initialValue).toLocaleString('en-IN')}</p>
              <p>Final Value: ₹{parseFloat(state.finalValue).toLocaleString('en-IN')}</p>
              <p>Time Period: {state.timePeriod} years</p>
              <p className="note">This is the annual rate at which your investment has grown over the specified time period.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CagrCalculator;