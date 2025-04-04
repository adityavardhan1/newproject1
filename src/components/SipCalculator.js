import React, { useState, useCallback } from 'react';
import '../Sip.css';

function SipCalculator() {
  const [state, setState] = useState({
    monthlyInvestment: '',
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

  const calculateSip = useCallback((isButtonClick = false) => {
    const parsedMonthlyInvestment = parseFloat(state.monthlyInvestment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;

    if (parsedMonthlyInvestment <= 0 || parsedRate <= 0 || parsedTenure <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    const r = parsedRate / 100 / 12;
    const n = parsedTenure * 12;
    const P = parsedMonthlyInvestment;

    // SIP formula: P * ((1 + r)^n - 1) / r * (1 + r)
    const amount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const totalEarningsCalc = amount - totalInvestment;

    setState(prev => ({
      ...prev,
      futureValue: amount,
      totalEarnings: totalEarningsCalc,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, [state.monthlyInvestment, state.rate, state.tenure]);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateSip(false);
      }
    }
  }, [state.isFirstCalculation, calculateSip]);

  const handleReset = useCallback(() => {
    setState({
      monthlyInvestment: '',
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
      <h1 className="center">SIP Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>SIP Investment Calculator</h2>
              <p className="calculator-intro">Calculate your future wealth with regular monthly investments.</p>

              {['monthlyInvestment', 'rate', 'tenure'].map((field) => (
                <div className="input-group" key={field}>
                  <label htmlFor={field}>
                    {{
                      monthlyInvestment: 'Monthly Investment',
                      rate: 'Expected Rate of Return (P.A)',
                      tenure: 'Time Period (in years)'
                    }[field]} *
                  </label>
                  <input
                    type="text"
                    id={field}
                    placeholder={`Ex: ${field === 'monthlyInvestment' ? '10000' : field === 'rate' ? '12' : '10'}`}
                    value={state[field]}
                    onChange={(e) => handleInputChange(e.target.value, field)}
                    autoComplete="off"
                  />
                </div>
              ))}

              <div className="button-container">
                <button 
                  className="calculate-button" 
                  onClick={() => calculateSip(true)} 
                  disabled={!state.monthlyInvestment || !state.rate || !state.tenure}
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
                  <p>Monthly Investment: {formatAmount(parseFloat(state.monthlyInvestment))}</p>
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

export default SipCalculator;