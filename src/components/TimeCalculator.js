import React, { useState } from 'react';
import '../Sip.css';

function TimeCalculator({ onClose }) {
  const initialState = {
    initialAmount: '',
    targetAmount: '',
    rate: '',
    requiredTime: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [initialAmount, setInitialAmount] = useState(initialState.initialAmount);
  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [rate, setRate] = useState(initialState.rate);
  const [requiredTime, setRequiredTime] = useState(initialState.requiredTime);
  const [showResult, setShowResult] = useState(initialState.showResult);
  const [isFirstCalculation, setIsFirstCalculation] = useState(initialState.isFirstCalculation);

  const calculateRequiredTime = (iAmount = initialAmount, tAmount = targetAmount, r = rate, isButtonClick = false) => {
    const parsedInitial = parseInt(iAmount.replace(/,/g, "")) || 0;
    const parsedTarget = parseInt(tAmount.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(r) || 0;

    if (parsedInitial > 0 && parsedTarget > 0 && parsedRate > 0) {
      const time = (Math.log(parsedTarget / parsedInitial)) / (Math.log(1 + (parsedRate/100)));
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
          type === 'initialAmount' ? value : initialAmount,
          type === 'targetAmount' ? value : targetAmount,
          type === 'rate' ? value : rate,
          false
        );
      }
    }
  };

  const handleCalculateClick = () => {
    calculateRequiredTime(initialAmount, targetAmount, rate, true);
  };

  const handleReset = () => {
    setInitialAmount(initialState.initialAmount);
    setTargetAmount(initialState.targetAmount);
    setRate(initialState.rate);
    setRequiredTime(initialState.requiredTime);
    setShowResult(initialState.showResult);
    setIsFirstCalculation(initialState.isFirstCalculation);
  };

  return (
    <div className="time-modal">
      <div className="time-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required Time Calculator</h2>
        <p>Calculate the time needed to reach your target amount</p>

        <div className="input-group">
          <label htmlFor="initialAmount">Initial Amount *</label>
          <input
            type="text"
            id="initialAmount"
            placeholder="Ex: 100000"
            value={initialAmount}
            onChange={(e) => handleInputChange(e.target.value, setInitialAmount, 'initialAmount')}
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
            onClick={handleCalculateClick}
            disabled={!initialAmount || !targetAmount || !rate}
          >
            Calculate Required Time
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && (
          <div className="result-container">
            <p>Required Time: {requiredTime.toFixed(1)} years</p>
            <p>Initial Amount: ₹{parseInt(initialAmount || 0).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseInt(targetAmount || 0).toLocaleString('en-IN')}</p>
            <p>Expected Return: {rate}% p.a.</p>
            <p className="note">This is the time needed for your initial amount to grow to the target amount at the expected rate of return.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeCalculator;