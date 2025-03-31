import React, { useState, useCallback } from 'react';
import './Sip.css';
import ReverseLumpsumCalculator from './components/ReverseLumpsum';
import LumpsumCagrCalculator from './components/LumpsumCagrCalculator';
import TimeCalculator from './components/LumpsumTimeCalculator';

function LumpsumCalculator() {
  const [state, setState] = useState({
    investment: '',
    rate: '',
    tenure: '',
    futureValue: 0,
    totalEarnings: 0,
    showResult: false,
    showInflationAdjusted: false,
    isFirstCalculation: true,
    showReverseLumpsum: false,
    showCagrCalculator: false,
    showTimeCalculator: false
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
    const amount = parsedInvestment * Math.pow((1 + r), parsedTenure);
    const totalEarningsCalc = amount - parsedInvestment;

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
      isFirstCalculation: true,
      showReverseLumpsum: false,
      showCagrCalculator: false,
      showTimeCalculator: false
    });
  }, []);

  return (
    <div className="main-container">
      <h1 className="center">Lumpsum Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>Lumpsum Investment Calculator</h2>
              <p className="calculator-intro">Calculate your future wealth with a one-time investment.</p>

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

          <div className="sidebar-right">
            <h3 className="sidebar-heading">Already know your goal amount?</h3>
            <button 
              className="reverse-sip-button" 
              onClick={() => setState(prev => ({ 
                ...prev, 
                showReverseLumpsum: !prev.showReverseLumpsum 
              }))}
            >
              {state.showReverseLumpsum ? 'Hide Required Investment Calculator' : 'Calculate Your Required One Time Investment'}
            </button>
            <button 
              className="cagr-button" 
              onClick={() => setState(prev => ({ 
                ...prev, 
                showCagrCalculator: !prev.showCagrCalculator 
              }))}
            >
              {state.showCagrCalculator ? 'Hide Required CAGR Calculator' : 'Calculate Your Required CAGR'}
            </button>
            <button 
              className="time-button" 
              onClick={() => setState(prev => ({ 
                ...prev, 
                showTimeCalculator: !prev.showTimeCalculator 
              }))}
            >
              {state.showTimeCalculator ? 'Hide Required Time Calculator' : 'Calculate Your Required Time'}
            </button>
          </div>
        </div>

        {state.showReverseLumpsum && (
  <ReverseLumpsumCalculator 
    onClose={() => setState(prev => ({ ...prev, showReverseLumpsum: false }))} 
  />
)}
         {state.showCagrCalculator && (
          <LumpsumCagrCalculator 
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

export default LumpsumCalculator;