import React, { useState, useCallback } from 'react';
import '../Sip.css';

function OneTimeInvestmentCalculator() {
  const [state, setState] = useState({
    investment: '',
    rate: '',
    tenure: '',
    futureValue: 0,
    totalEarnings: 0,
    showResult: false,
    showInflationAdjusted: false,
    isFirstCalculation: true
  });

  const formatAmount = useCallback((num) => {
    return num >= 10000000 
      ? `₹${(num / 10000000).toFixed(2)} Cr` 
      : `₹${(num / 100000).toFixed(2)} Lakh`;
  }, []);

  const calculateInflationAdjusted = useCallback((amount, tenure) => {
    const inflationRate = 0.07;
    const years = parseFloat(tenure) || 0;
    return formatAmount(amount / Math.pow(1 + inflationRate, years));
  }, [formatAmount]);

  const calculateReturns = useCallback((investment, rate, tenure, isButtonClick = false) => {
    const parsedInvestment = parseFloat(investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    if (parsedInvestment <= 0 || parsedRate <= 0 || parsedTenure <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    const r = parsedRate / 100;
    // Formula for one-time investment: P * (1 + r)^n
    // where P is the investment amount, r is the rate, and n is the number of years
    const amount = parsedInvestment * Math.pow(1 + r, parsedTenure);
    const totalInvestment = parsedInvestment;
    const totalEarningsCalc = amount - totalInvestment;

    setState(prev => ({
      ...prev,
      futureValue: amount,
      totalEarnings: totalEarningsCalc,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, []);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateReturns(state.investment, state.rate, state.tenure, false);
      }
    }
  }, [state.isFirstCalculation, calculateReturns, state.investment, state.rate, state.tenure]);

  const handleReset = useCallback(() => {
    setState({
      investment: '',
      rate: '',
      tenure: '',
      futureValue: 0,
      totalEarnings: 0,
      showResult: false,
      showInflationAdjusted: false,
      isFirstCalculation: true
    });
  }, []);

  return (
    <div className="main-container">
      <h1 className="center">One-Time Investment Return Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>One-Time Investment Return Calculator</h2>
              <p className="calculator-intro">Calculate returns on your one-time investment over a specific time period.</p>

              {['investment', 'rate', 'tenure'].map((field) => (
                <div className="input-group" key={field}>
                  <label htmlFor={field}>
                    {{
                      investment: 'Investment Amount',
                      rate: 'Expected Rate of Return (P.A)',
                      tenure: 'Time Period (in years)'
                    }[field]} *
                  </label>
                  <input
                    type="text"
                    id={field}
                    placeholder={`Ex: ${field === 'investment' ? '100000' : field === 'rate' ? '12' : '10'}`}
                    value={state[field]}
                    onChange={(e) => handleInputChange(e.target.value, field)}
                    autoComplete="off"
                  />
                </div>
              ))}

              <div className="button-container">
                <button 
                  className="calculate-button" 
                  onClick={() => calculateReturns(state.investment, state.rate, state.tenure, true)} 
                  disabled={!state.investment || !state.rate || !state.tenure}
                >
                  Calculate Returns
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <h3>Investment Summary</h3>
                  <div className="result-grid">
                    <div className="result-item">
                      <p className="result-label">Initial Investment</p>
                      <p className="result-value">{formatAmount(parseFloat(state.investment))}</p>
                    </div>
                    <div className="result-item">
                      <p className="result-label">Future Value</p>
                      <p className="result-value">{formatAmount(state.futureValue)}</p>
                    </div>
                    <div className="result-item">
                      <p className="result-label">Total Returns</p>
                      <p className="result-value">{formatAmount(state.totalEarnings)}</p>
                    </div>
                    <div className="result-item">
                      <p className="result-label">Return on Investment</p>
                      <p className="result-value">{((state.totalEarnings / parseFloat(state.investment)) * 100).toFixed(2)}%</p>
                    </div>
                  </div>
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
                    <div className="inflation-adjusted">
                      <p>
                        Inflation Adjusted Future Value (7% p.a.): 
                        {calculateInflationAdjusted(state.futureValue, state.tenure)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneTimeInvestmentCalculator; 