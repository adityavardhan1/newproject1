import React, { useState, useCallback } from 'react';
import '../Sip.css';
import useScrollToTop from '../hooks/useScrollToTop';

function CagrCalculator() {
  useScrollToTop();
  
  const formatAmount = useCallback((num) => {
    const formattedNumber = new Intl.NumberFormat('en-IN').format(Math.round(num));
    const inThousands = (num / 1000).toFixed(2);
    const inLakhs = (num / 100000).toFixed(2);
    const inCrores = (num / 10000000).toFixed(2);
    
    if (num >= 10000000) {
      return `${formattedNumber} (₹${inCrores} Cr)`;
    } else if (num >= 100000) {
      return `${formattedNumber} (₹${inLakhs} Lakh)`;
    } else {
      return `${formattedNumber} (₹${inThousands} Thousand)`;
    }
  }, []);

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
    <div className="main-container">
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>CAGR Calculator</h2>
              <p className="calculator-intro">Calculate the Compound Annual Growth Rate of your investments</p>

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
                  <p>Initial Investment: {formatAmount(parseFloat(state.initialValue))}</p>
                  <p>Final Value: {formatAmount(parseFloat(state.finalValue))}</p>
                  <p>Time Period: {state.timePeriod} years</p>
                  <p className="note">* This is an approximate calculation. Actual CAGR may vary based on market conditions.</p>
                  <p className="note">This calculator is for educational purposes only. The actual CAGR of your investment may vary based on market conditions, fees, and other factors. Please consult with a financial advisor for personalized advice.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CagrCalculator;