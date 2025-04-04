import React, { useState, useCallback } from 'react';
import '../Sip.css';

function LumpsumCalculator() {
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

  const calculateInflationAdjusted = useCallback((amount) => {
    const inflationRate = 0.07;
    const years = parseFloat(state.tenure) || 0;
    return formatAmount(amount / Math.pow(1 + inflationRate, years));
  }, [state.tenure, formatAmount]);

  const calculateLumpsum = useCallback((isButtonClick = false) => {
    const parsedInvestment = parseFloat(state.investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;

    if (parsedInvestment <= 0 || parsedRate <= 0 || parsedTenure <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    const r = parsedRate / 100;
    // Formula for annual SIP: P * ((1 + r)^n - 1) / r
    // where P is the annual investment, r is the rate, and n is the number of years
    const amount = parsedInvestment * ((Math.pow(1 + r, parsedTenure) - 1) / r);
    const totalInvestment = parsedInvestment * parsedTenure;
    const totalEarningsCalc = amount - totalInvestment;

    setState(prev => ({
      ...prev,
      futureValue: amount,
      totalEarnings: totalEarningsCalc,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, [state.investment, state.rate, state.tenure]);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateLumpsum(false);
      }
    }
  }, [state.isFirstCalculation, calculateLumpsum]);

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
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>Lumpsum Calculator</h2>
              <p className="calculator-intro">Calculate returns on your one-time investment with compound interest.</p>

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
                  onClick={() => calculateLumpsum(true)} 
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
                  <p>Investment Amount: {formatAmount(parseFloat(state.investment))}</p>
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
        </div>
      </div>
    </div>
  );
}

export default LumpsumCalculator;