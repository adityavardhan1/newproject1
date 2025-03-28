import React, { useState } from 'react';
import '../Sip.css';

function ReverseSipCalculator({ onClose }) {
  const initialState = {
    targetAmount: '',
    rate: '',
    tenure: '',
    requiredSip: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [rate, setRate] = useState(initialState.rate);
  const [tenure, setTenure] = useState(initialState.tenure);
  const [requiredSip, setRequiredSip] = useState(initialState.requiredSip);
  const [showResult, setShowResult] = useState(initialState.showResult);
  const [isFirstCalculation, setIsFirstCalculation] = useState(initialState.isFirstCalculation);

  const calculateRequiredSip = (tAmount = targetAmount, tRate = rate, tTenure = tenure, isButtonClick = false) => {
    const parsedTarget = parseInt(tAmount.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(tRate) || 0;
    const parsedTenure = parseInt(tTenure) || 1; // Default to 1 year if empty/0

    if (parsedTarget > 0 && parsedRate > 0) { // Remove tenure check
      const monthlyRate = parsedRate / (12 * 100);
      const months = parsedTenure * 12;
      
      const numerator = parsedTarget;
      const denominator = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
      const sipAmount = numerator / denominator;

      setRequiredSip(sipAmount);
      
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
        calculateRequiredSip(
          type === 'targetAmount' ? value : targetAmount,
          type === 'rate' ? value : rate,
          type === 'tenure' ? (value || '1') : tenure, // Use '1' as fallback
          false
        );
      }
    }
  };

  const handleCalculateClick = () => {
    calculateRequiredSip(targetAmount, rate, tenure, true);
  };

  const handleReset = () => {
    setTargetAmount(initialState.targetAmount);
    setRate(initialState.rate);
    setTenure(initialState.tenure);
    setRequiredSip(initialState.requiredSip);
    setShowResult(initialState.showResult);
    setIsFirstCalculation(initialState.isFirstCalculation);
  };

  return (
    <div className="reverse-sip-modal">
      <div className="reverse-sip-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Target SIP Amount Calculator</h2>
        <p>Calculate required monthly SIP for your target amount</p>

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
          <label htmlFor="rate">Expected rate of return (P.A) *</label>
          <input
            type="text"
            id="rate"
            placeholder="Ex: 12"
            value={rate}
            onChange={(e) => handleInputChange(e.target.value, setRate, 'rate')}
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
          <button className="calculate-button" onClick={handleCalculateClick} disabled={!targetAmount || !rate || !tenure}>
            Calculate Required SIP
          </button>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>

        {showResult && targetAmount && rate && (
          <div className="result-container">
            <p>Required Monthly SIP: ₹{Math.round(requiredSip).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseInt(targetAmount).toLocaleString('en-IN')}</p>
            <p>Time Period: {tenure || 1} years</p>
            <p>Expected Return: {rate}% p.a.</p>
            <p className="note">This is the required monthly investment needed to reach your target amount at the expected rate of return.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReverseSipCalculator;