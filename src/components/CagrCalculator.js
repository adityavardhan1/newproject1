import React, { useState } from 'react';
import '../Sip.css';

function CagrCalculator({ onClose }) {
  const initialState = {
    initialAmount: '',
    targetAmount: '',
    tenure: '',
    requiredCAGR: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [initialAmount, setInitialAmount] = useState(initialState.initialAmount);
  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [tenure, setTenure] = useState(initialState.tenure);
  const [requiredCAGR, setRequiredCAGR] = useState(initialState.requiredCAGR);
  const [showResult, setShowResult] = useState(initialState.showResult);
  const [isFirstCalculation, setIsFirstCalculation] = useState(initialState.isFirstCalculation);

  const calculateRequiredCAGR = (iAmount = initialAmount, tAmount = targetAmount, ten = tenure, isButtonClick = false) => {
    const parsedInitial = parseInt(iAmount.replace(/,/g, "")) || 0;
    const parsedTarget = parseInt(tAmount.replace(/,/g, "")) || 0;
    const parsedTenure = parseInt(ten) || 1; // Default to 1 year if empty

    if (parsedInitial > 0 && parsedTarget > 0) {
      const cagr = (Math.pow(parsedTarget / parsedInitial, 1 / parsedTenure) - 1) * 100;
      setRequiredCAGR(cagr);
      
      if (isButtonClick && isFirstCalculation) {
        setShowResult(true);
        setIsFirstCalculation(false);
      }
    }
  };

  const handleInputChange = (value, setter, type) => {
    if (/^\d*$/.test(value)) {
      setter(value);

      if (!isFirstCalculation) {
        calculateRequiredCAGR(
          type === 'initialAmount' ? value : initialAmount,
          type === 'targetAmount' ? value : targetAmount,
          type === 'tenure' ? (value || '1') : tenure,
          false
        );
      }
    }
  };

  const handleCalculateClick = () => {
    calculateRequiredCAGR(initialAmount, targetAmount, tenure, true);
  };

  const handleReset = () => {
    setInitialAmount(initialState.initialAmount);
    setTargetAmount(initialState.targetAmount);
    setTenure(initialState.tenure);
    setRequiredCAGR(initialState.requiredCAGR);
    setShowResult(initialState.showResult);
    setIsFirstCalculation(initialState.isFirstCalculation);
  };

  return (
    <div className="cagr-modal">
      <div className="cagr-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required CAGR Calculator</h2>
        <p>Calculate the required growth rate to reach your target amount</p>

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
          <label htmlFor="tenure">Time Period (in years) *</label>
          <input
            type="text"
            id="tenure"
            placeholder="Ex: 10"
            value={tenure}
            onChange={(e) => handleInputChange(e.target.value, setTenure, 'tenure')}
            autoComplete="off"
          />
        </div>

        <div className="button-container">
          <button 
            className="calculate-button" 
            onClick={handleCalculateClick}
            disabled={!initialAmount || !targetAmount || !tenure}
          >
            Calculate Required CAGR
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && (
          <div className="result-container">
            <p>Required CAGR: {requiredCAGR.toFixed(2)}% p.a.</p>
            <p>Initial Amount: ₹{parseInt(initialAmount || 0).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseInt(targetAmount || 0).toLocaleString('en-IN')}</p>
            <p>Time Period: {tenure || 1} years</p>
            <p className="note">This is the required annual growth rate to grow your initial amount to the target amount.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CagrCalculator;