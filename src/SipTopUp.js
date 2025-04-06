import React, { useState, useCallback, useEffect } from 'react';
import '../Sip.css';
import StepUpCalculator from './components/StepUpCalculator';
import StepupCagrCalculator from './components/StepupCagrCalculator';
import StepupTimeCalculator from './components/StepupTimeCalculator';

function SipTopUpCalculator() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [state, setState] = useState({
    investment: '',
    rate: '',
    tenure: '',
    topUpPercentage: '',
    futureValue: 0,
    totalEarnings: 0,
    totalDeposited: 0,
    showResult: false,
    showInflationAdjusted: false,
    showReverseSip: false,
    showCagrCalculator: false,
    showTimeCalculator: false,
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

  const calculateSipWithTopUp = useCallback((isButtonClick = false) => {
    const parsedInvestment = parseFloat(state.investment.replace(/,/g, '')) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;
    const parsedTopUpPercentage = parseFloat(state.topUpPercentage) || 0;

    if (parsedInvestment <= 0 || parsedRate <= 0 || parsedTenure <= 0 || parsedTopUpPercentage <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    let monthlyInvestment = parsedInvestment;
    let totalDeposited = 0;
    let futureValue = 0;
    const monthlyRate = parsedRate / 100 / 12;
    const yearlyTopUpMultiplier = 1 + (parsedTopUpPercentage / 100);

    for (let year = 0; year < parsedTenure; year++) {
      for (let month = 0; month < 12; month++) {
        futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
        totalDeposited += monthlyInvestment;
      }
      monthlyInvestment *= yearlyTopUpMultiplier;
    }

    setState(prev => ({
      ...prev,
      futureValue,
      totalEarnings: futureValue - totalDeposited,
      totalDeposited,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, [state.investment, state.rate, state.tenure, state.topUpPercentage]);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateSipWithTopUp(false);
      }
    }
  }, [state.isFirstCalculation, calculateSipWithTopUp]);

  const handleReset = useCallback(() => {
    setState({
      investment: '',
      rate: '',
      tenure: '',
      topUpPercentage: '',
      futureValue: 0,
      totalEarnings: 0,
      totalDeposited: 0,
      showResult: false,
      showInflationAdjusted: false,
      showReverseSip: false,
      showCagrCalculator: false,
      showTimeCalculator: false,
      isFirstCalculation: true
    });
  }, []);

  return (
    <div className="main-container">
      <h1 className="center">SIP Top-up Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>SIP Top-up Calculator</h2>
              <p className="calculator-intro">Calculate your future wealth with yearly SIP top-ups.</p>

              {[
                { field: 'investment', label: 'Monthly Investment Amount', placeholder: '10000' },
                { field: 'topUpPercentage', label: 'Yearly Top Up (%)', placeholder: '10' },
                { field: 'rate', label: 'Expected Rate of Return (P.A)', placeholder: '12' },
                { field: 'tenure', label: 'Time Period (in years)', placeholder: '10' }
              ].map(({ field, label, placeholder }) => (
                <div className="input-group" key={field}>
                  <label htmlFor={field}>{label} *</label>
                  <input
                    type="text"
                    id={field}
                    placeholder={`Ex: ${placeholder}`}
                    value={state[field]}
                    onChange={(e) => handleInputChange(e.target.value, field)}
                    autoComplete="off"
                  />
                </div>
              ))}

              <div className="button-container">
                <button 
                  className="calculate-button" 
                  onClick={() => calculateSipWithTopUp(true)} 
                  disabled={!state.investment || !state.rate || !state.tenure || !state.topUpPercentage}
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
                  <p>Total Amount Invested: {formatAmount(state.totalDeposited)}</p>
                  <p>Total Earnings: {formatAmount(state.totalEarnings)}</p>
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
                      Inflation Adjusted Value (7% p.a.): 
                      {calculateInflationAdjusted(state.futureValue)}
                    </p>
                  )}
                  <p className="note">* This is an approximate calculation. Actual returns may vary based on market conditions.</p>
                  
                  <p className="note">
                    This calculator is for educational purposes only and should not be considered as financial advice.
                    Investment returns are not guaranteed, and past performance does not guarantee future results.
                    The calculation assumes a constant rate of return, which may not be realistic in actual market conditions.
                    Always consult with a qualified financial advisor before making investment decisions.
                  </p>
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
                showReverseSip: !prev.showReverseSip 
              }))}
            >
              {state.showReverseSip ? 'Hide Required Step-up Percentage Calculator' : 'Calculate Your Required Step-up Percentage'}
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

        {state.showReverseSip && (
          <StepUpCalculator
            onClose={() => setState(prev => ({ ...prev, showReverseSip: false }))} 
          />
        )}
        {state.showCagrCalculator && (
          <StepupCagrCalculator
            onClose={() => setState(prev => ({ ...prev, showCagrCalculator: false }))} 
          />
        )}
        {state.showTimeCalculator && (
          <StepupTimeCalculator
            onClose={() => setState(prev => ({ ...prev, showTimeCalculator: false }))} 
          />
        )}
      </div>
    </div>
  );
}

export default SipTopUpCalculator;