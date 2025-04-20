import React, { useState, useCallback } from 'react';
import '../Sip.css';
import useScrollToTop from '../hooks/useScrollToTop';

function StepupTimeCalculator() {
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
    monthlyInvestment: '',
    tenure: '',
    rate: '',
    stepUpPercentage: '',
    inflationRate: '7', // Default inflation rate
    futureValue: 0,
    totalInvestment: 0,
    totalEarnings: 0,
    showResult: false,
    showInflationAdjusted: false,
    isFirstCalculation: true
  };

  const [state, setState] = useState(initialState);

  const calculateInflationAdjusted = useCallback((amount) => {
    const inflationRate = parseFloat(state.inflationRate) / 100;
    const years = parseFloat(state.tenure) || 0;
    return formatAmount(amount / Math.pow(1 + inflationRate, years));
  }, [state.tenure, state.inflationRate, formatAmount]);

  const calculateStepUpSip = () => {
    const monthlyInvestment = parseFloat(state.monthlyInvestment.replace(/,/g, '')) || 0;
    const tenure = parseFloat(state.tenure) || 0;
    const rate = parseFloat(state.rate) || 0;
    const stepUpPercentage = parseFloat(state.stepUpPercentage) || 0;

    if (monthlyInvestment <= 0 || tenure <= 0 || rate <= 0 || stepUpPercentage <= 0) {
      return;
    }

    const r = rate / 100 / 12;
    const g = stepUpPercentage / 100 / 12;
    const n = tenure * 12;
    const P = monthlyInvestment;

    // Calculate total investment
    let totalInvestment = 0;
    let currentInvestment = P;
    for (let i = 0; i < n; i++) {
      totalInvestment += currentInvestment;
      currentInvestment *= (1 + g);
    }

    // Calculate future value using step-up SIP formula
    const futureValue = P * ((Math.pow(1 + r, n) - Math.pow(1 + g, n)) / (r - g));
    
    setState(prev => ({
      ...prev,
      futureValue: futureValue,
      totalInvestment: totalInvestment,
      totalEarnings: futureValue - totalInvestment,
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
              <h2>Step-up SIP Calculator</h2>
              <p className="calculator-intro">Calculate your future corpus with increasing monthly investments</p>

              <div className="input-group">
                <label htmlFor="monthlyInvestment">Initial Monthly Investment *</label>
                <input
                  type="text"
                  id="monthlyInvestment"
                  placeholder="Ex: 10000"
                  value={state.monthlyInvestment}
                  onChange={(e) => handleInputChange(e.target.value, 'monthlyInvestment')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="stepUpPercentage">Annual Step-up Percentage *</label>
                <input
                  type="text"
                  id="stepUpPercentage"
                  placeholder="Ex: 10"
                  value={state.stepUpPercentage}
                  onChange={(e) => handleInputChange(e.target.value, 'stepUpPercentage')}
                  autoComplete="off"
                />
              </div>

              <div className="input-group">
                <label htmlFor="tenure">Investment Period (in years) *</label>
                <input
                  type="text"
                  id="tenure"
                  placeholder="Ex: 10"
                  value={state.tenure}
                  onChange={(e) => handleInputChange(e.target.value, 'tenure')}
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

              <div className="button-container">
                <button 
                  className="calculate-button"
                  onClick={calculateStepUpSip}
                  disabled={!state.monthlyInvestment || !state.tenure || !state.rate || !state.stepUpPercentage}
                >
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <h2>Results</h2>
                  <p>Future Value: {formatAmount(state.futureValue)}</p>
                  <p>Total Investment: {formatAmount(state.totalInvestment)}</p>
                  <p>Total Earnings: {formatAmount(state.totalEarnings)}</p>
                  
                  <div className="input-group">
                    <label htmlFor="inflationRate">Inflation Rate (%)</label>
                    <input
                      type="text"
                      id="inflationRate"
                      value={state.inflationRate}
                      onChange={(e) => handleInputChange(e.target.value, 'inflationRate')}
                      placeholder="Enter inflation rate"
                    />
                  </div>

                  <button 
                    className="inflation-button"
                    onClick={() => setState(prev => ({ ...prev, showInflationAdjusted: !prev.showInflationAdjusted }))}
                  >
                    {state.showInflationAdjusted ? 'Hide Inflation Adjusted Value' : 'Show Inflation Adjusted Value'}
                  </button>

                  {state.showInflationAdjusted && (
                    <div className="inflation-adjusted-result">
                      <p>Inflation Adjusted Future Value: {calculateInflationAdjusted(state.futureValue)}</p>
                    </div>
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
        </div>
      </div>
    </div>
  );
}

export default StepupTimeCalculator;