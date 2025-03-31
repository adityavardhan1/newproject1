import React, { useState } from 'react';
import './Sip.css';
import StepUpCalculator from './components/StepUpCalculator';
import CagrCalculator from './components/CagrCalculator';
import TimeCalculator from './components/TimeCalculator';

const SIPTopUpCalculator = () => {
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

  const calculateSipWithTopUp = (isButtonClick = false) => {
    const parsedInvestment = parseFloat(state.investment.replace(/,/g, '')) || 0;
    const parsedRate = parseFloat(state.rate) || 0;
    const parsedTenure = parseFloat(state.tenure) || 0;
    const parsedTopUpPercentage = parseFloat(state.topUpPercentage) || 0;

    if (parsedInvestment > 0 && parsedRate > 0 && parsedTenure > 0) {
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
  };

  const handleInputChange = (value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      
      if (!state.isFirstCalculation) {
        calculateSipWithTopUp(false);
      }
    }
  };

  return (
    <div className="main-container">
      <h1 className="center">SIP Top-up Calculator</h1>
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>SIP with Top-up Calculator</h2>
              <p className="calculator-intro">Calculate your future wealth with yearly SIP top-ups.</p>

              <div className="input-group">
                <label htmlFor="investment">Monthly Investment Amount *</label>
                <input
                  type="text"
                  id="investment"
                  placeholder="Ex: 10000"
                  value={state.investment}
                  onChange={(e) => handleInputChange(e.target.value, 'investment')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="topUpPercentage">Yearly Top Up (%)*</label>
                <input
                  type="text"
                  id="topUpPercentage"
                  placeholder="Ex: 5"
                  value={state.topUpPercentage}
                  onChange={(e) => handleInputChange(e.target.value, 'topUpPercentage')}
                  autoComplete="off"
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
                  <p>Total Earnings: {formatAmount(state.totalEarnings)}</p>
                  <p>Total Amount Invested: {formatAmount(state.totalDeposited)}</p>
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
                showReverseSip: !prev.showReverseSip 
              }))}
            >
              {state.showReverseSip ? 'Hide Required Investment Calculator' : 'Calculate Your Required Step Up Percentage'}
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
          <CagrCalculator 
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
};

export default SIPTopUpCalculator;