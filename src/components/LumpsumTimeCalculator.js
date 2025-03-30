import React, { useState } from 'react';
import '../Sip.css';

function LumpsumTimeCalculator({ onClose }) {
  const initialState = {
    investment: '',
    targetAmount: '',
    rate: '',
    requiredTime: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [investment, setInvestment] = useState(initialState.investment);
  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [rate, setRate] = useState(initialState.rate);
  const [requiredTime, setRequiredTime] = useState(initialState.requiredTime);
  const [showResult, setShowResult] = useState(initialState.showResult);
  const [isFirstCalculation, setIsFirstCalculation] = useState(initialState.isFirstCalculation);

  const calculateRequiredTime = (inv = investment, tAmount = targetAmount, tRate = rate, isButtonClick = false) => {
    const parsedInvestment = parseFloat(inv.replace(/,/g, "")) || 0;
    const parsedTarget = parseFloat(tAmount.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(tRate) || 0;

    if (parsedInvestment > 0 && parsedTarget > 0 && parsedRate > 0) {
      const r = parsedRate / 100;
      const time = Math.log(parsedTarget / parsedInvestment) / Math.log(1 + r);
      
      setRequiredTime(time);
      
      if (isButtonClick && isFirstCalculation) {
        setShowResult(true);
        setIsFirstCalculation(false);
      }
    }
  };

  const handleInputChange = (value, setter, type) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
      if (!isFirstCalculation) {
        calculateRequiredTime(
          type === 'investment' ? value : investment,
          type === 'targetAmount' ? value : targetAmount,
          type === 'rate' ? value : rate,
          false
        );
      }
    }
  };

  const handleReset = () => {
    setInvestment(initialState.investment);
    setTargetAmount(initialState.targetAmount);
    setRate(initialState.rate);
    setRequiredTime(initialState.requiredTime);
    setShowResult(initialState.showResult);
    setIsFirstCalculation(initialState.isFirstCalculation);
  };

  const formatTime = (years) => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    
    if (months === 12) {
      return `${wholeYears + 1} years`;
    }
    
    if (wholeYears === 0) {
      return `${months} months`;
    }
    
    return months > 0 ? `${wholeYears} years ${months} months` : `${wholeYears} years`;
  };

  return (
    <div className="time-modal">
      <div className="time-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required Time Calculator</h2>
        <p>Calculate time needed to reach your target amount with a one-time investment</p>

        <div className="input-group">
          <label htmlFor="investment">Investment Amount *</label>
          <input
            type="text"
            id="investment"
            placeholder="Ex: 100000"
            value={investment}
            onChange={(e) => handleInputChange(e.target.value, setInvestment, 'investment')}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="targetAmount">Target Amount *</label>
          <input
            type="text"
            id="targetAmount"
            placeholder="Ex: 1000000"
            value={targetAmount}
            onChange={(e) => handleInputChange(e.target.value, setTargetAmount, 'targetAmount')}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="rate">Expected Rate of Return (P.A) *</label>
          <input
            type="text"
            id="rate"
            placeholder="Ex: 12"
            value={rate}
            onChange={(e) => handleInputChange(e.target.value, setRate, 'rate')}
            autoComplete="off"
          />
        </div>

        <div className="button-container">
          <button 
            className="calculate-button" 
            onClick={() => calculateRequiredTime(investment, targetAmount, rate, true)}
            disabled={!investment || !targetAmount || !rate}
          >
            Calculate Required Time
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && (
          <div className="result-container">
            <p>Required Time: {formatTime(requiredTime)}</p>
            <p>Investment Amount: ₹{parseFloat(investment).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseFloat(targetAmount).toLocaleString('en-IN')}</p>
            <p>Expected Return Rate: {rate}% p.a.</p>
            <p className="note">This is the time required for your one-time investment to grow to the target amount.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LumpsumTimeCalculator;