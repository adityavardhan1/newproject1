import React, { useState, useCallback } from 'react';
import '../Sip.css';
import useScrollToTop from '../hooks/useScrollToTop';

function TimeCalculator() {
  useScrollToTop();

  const [state, setState] = useState({
    monthlyInvestment: '',
    targetAmount: '',
    rate: '',
    requiredTime: 0,
    showResult: false,
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

  const calculateRequiredTime = useCallback((isButtonClick = false) => {
    const monthlyInvestment = parseFloat(state.monthlyInvestment.replace(/,/g, '')) || 0;
    const targetAmount = parseFloat(state.targetAmount.replace(/,/g, '')) || 0;
    const rate = parseFloat(state.rate) || 0;

    if (monthlyInvestment <= 0 || targetAmount <= 0 || rate <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    const r = rate / 100 / 12;
    const P = monthlyInvestment;
    const A = targetAmount;

    // Using logarithm to solve for n in the SIP formula
    const n = Math.log(1 + (A * r) / (P * (1 + r))) / Math.log(1 + r);
    
    setState(prev => ({
      ...prev,
      requiredTime: n / 12,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, [state.monthlyInvestment, state.targetAmount, state.rate]);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateRequiredTime(false);
      }
    }
  }, [state.isFirstCalculation, calculateRequiredTime]);

  const handleReset = useCallback(() => {
    setState({
      monthlyInvestment: '',
      targetAmount: '',
      rate: '',
      requiredTime: 0,
      showResult: false,
      isFirstCalculation: true
    });
  }, []);

  const formatTime = useCallback((years) => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    
    if (months === 12) {
      return `${wholeYears + 1} years`;
    }
    
    if (wholeYears === 0) {
      return `${months} months`;
    }
    
    return months > 0 ? `${wholeYears} years ${months} months` : `${wholeYears} years`;
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>SIP Time Duration Calculator</h2>
              <p className="calculator-intro">
                Calculate how long it will take to reach your target amount with monthly SIP investments
              </p>

              <div className="input-group">
                <label htmlFor="monthlyInvestment">Monthly Investment Amount (₹)</label>
                <input
                  type="text"
                  id="monthlyInvestment"
                  value={state.monthlyInvestment}
                  onChange={(e) => handleInputChange(e.target.value, 'monthlyInvestment')}
                  placeholder="Enter monthly investment amount"
                />
              </div>

              <div className="input-group">
                <label htmlFor="targetAmount">Target Amount (₹)</label>
                <input
                  type="text"
                  id="targetAmount"
                  value={state.targetAmount}
                  onChange={(e) => handleInputChange(e.target.value, 'targetAmount')}
                  placeholder="Enter target amount"
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

              <div className="button-container">
                <button className="calculate-button" onClick={() => calculateRequiredTime(true)}>
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <h2>Results</h2>
                  <p>Required Time: {formatTime(state.requiredTime)}</p>
                  <p>Monthly Investment: {formatAmount(parseFloat(state.monthlyInvestment))}</p>
                  <p>Target Amount: {formatAmount(parseFloat(state.targetAmount))}</p>
                  <p>Expected Return Rate: {state.rate}% p.a.</p>
                  <p className="note">* This is an approximate calculation. Actual time may vary based on market conditions.</p>
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

export default TimeCalculator;