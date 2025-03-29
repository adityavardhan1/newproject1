import React, { useState } from 'react';
import './Sip.css';

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

  const calculateLumpsum = (isButtonClick = false) => {
    const { investment, rate, tenure } = state;
    const parsedInvestment = parseFloat(investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    if (parsedInvestment > 0 && parsedRate > 0 && parsedTenure > 0) {
      const r = parsedRate / 100;
      const amount = parsedInvestment * Math.pow((1 + r), parsedTenure);
      const totalEarningsCalc = amount - parsedInvestment;

      setState(prev => ({
        ...prev,
        futureValue: amount,
        totalEarnings: totalEarningsCalc,
        showResult: isButtonClick ? true : prev.showResult,
        isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
      }));
    }
  };

  const handleInputChange = (value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation && state.showResult) {
        calculateLumpsum(false);
      }
    }
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
      investment: '',
      rate: '',
      tenure: '',
      futureValue: 0,
      totalEarnings: 0,
      showResult: false,
      showInflationAdjusted: false,
      isFirstCalculation: true
    });
  };

  return (
    <div className="lumpsum-page">
      <div className="lumpsum-container">
        <h1 className="center">Lumpsum Calculator</h1>
        <div className="calculator-box">
          <h2>Lumpsum Investment Calculator</h2>
          <p>Calculate your future wealth with a one-time investment.</p>

          {['investment', 'rate', 'tenure'].map((field) => (
            <div className="input-group" key={field}>
              <label htmlFor={field}>{
                field === 'investment' ? 'Investment Amount' :
                field === 'rate' ? 'Expected Rate of Return (P.A)' :
                'Time Period (in years)'
              } *</label>
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
                {state.showInflationAdjusted ? "Hide" : "Show"} Inflation Adjusted Value
              </button>
              {state.showInflationAdjusted && (
                <p>
                  Inflation Adjusted Future Value (7% p.a.): 
                  {calculateInflationAdjusted(state.futureValue)}
                </p>
              )}
              <p className="note">
                This calculation shows how your one-time investment grows over time at the expected rate of return.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LumpsumCalculator;