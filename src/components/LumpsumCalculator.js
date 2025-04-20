import React, { useState, useCallback, useEffect } from 'react';
import '../Sip.css';
import useScrollToTop from '../hooks/useScrollToTop';

function LumpsumCalculator() {
  useScrollToTop();

  const [state, setState] = useState({
    investment: '',
    rate: '',
    tenure: '',
    inflationRate: '7', // Default inflation rate
    futureValue: 0,
    totalInvestment: 0,
    totalEarnings: 0,
    showResult: false,
    showInflationAdjusted: false,
    isFirstCalculation: true
  });

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

  const calculateInflationAdjusted = useCallback((amount) => {
    const inflationRate = parseFloat(state.inflationRate) / 100;
    const years = parseFloat(state.tenure) || 0;
    return formatAmount(amount / Math.pow(1 + inflationRate, years));
  }, [state.tenure, state.inflationRate, formatAmount]);

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
    const n = parsedTenure;
    const P = parsedInvestment;

    // Lumpsum formula: P * (1 + r)^n
    const amount = P * Math.pow(1 + r, n);
    const totalInvestment = P;
    const totalEarningsCalc = amount - totalInvestment;

    setState(prev => ({
      ...prev,
      futureValue: amount,
      totalInvestment: totalInvestment,
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
      inflationRate: '7',
      futureValue: 0,
      totalInvestment: 0,
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
              <p className="calculator-intro">
                Calculate the future value of your one-time investment
              </p>
              
              <div className="input-group">
                <label htmlFor="investment">Investment Amount (₹)</label>
                <input
                  type="text"
                  id="investment"
                  value={state.investment}
                  onChange={(e) => handleInputChange(e.target.value, 'investment')}
                  placeholder="Enter investment amount"
                />
              </div>

              <div className="input-group">
                <label htmlFor="rate">Expected Annual Return (%)</label>
                <input
                  type="text"
                  id="rate"
                  value={state.rate}
                  onChange={(e) => handleInputChange(e.target.value, 'rate')}
                  placeholder="Enter expected annual return"
                />
              </div>

              <div className="input-group">
                <label htmlFor="tenure">Investment Period (Years)</label>
                <input
                  type="text"
                  id="tenure"
                  value={state.tenure}
                  onChange={(e) => handleInputChange(e.target.value, 'tenure')}
                  placeholder="Enter investment period in years"
                />
              </div>

              <div className="button-container">
                <button className="calculate-button" onClick={() => calculateLumpsum(true)}>
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
                      placeholder="Enter expected inflation rate"
                    />
                  </div>
                  
                  <button 
                    className="calculate-button" 
                    onClick={() => setState(prev => ({ ...prev, showInflationAdjusted: !prev.showInflationAdjusted }))}
                    style={{ marginTop: '10px' }}
                  >
                    {state.showInflationAdjusted ? 'Hide' : 'Show'} Inflation Adjusted Value
                  </button>
                  
                  {state.showInflationAdjusted && (
                    <p>
                      Inflation Adjusted Value ({state.inflationRate}% p.a.): {calculateInflationAdjusted(state.futureValue)}
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
        </div>
      </div>
    </div>
  );
}

export default LumpsumCalculator;