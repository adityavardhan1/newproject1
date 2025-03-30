import React, { useState } from 'react';
import '../Sip.css';

function ReverseLumpsumCalculator({ onClose }) {
  const initialState = {
    targetAmount: '',
    rate: '',
    tenure: '',
    requiredInvestment: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [rate, setRate] = useState(initialState.rate);
  const [tenure, setTenure] = useState(initialState.tenure);
  const [requiredInvestment, setRequiredInvestment] = useState(initialState.requiredInvestment);
  const [showResult, setShowResult] = useState(initialState.showResult);
  const [isFirstCalculation, setIsFirstCalculation] = useState(initialState.isFirstCalculation);

  const calculateRequiredInvestment = (tAmount = targetAmount, tRate = rate, tTenure = tenure, isButtonClick = false) => {
    const parsedTarget = parseInt(tAmount.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(tRate) || 0;
    const parsedTenure = parseInt(tTenure) || 1;

    if (parsedTarget > 0 && parsedRate > 0) {
      const yearlyRate = parsedRate / 100;
      const investment = parsedTarget / Math.pow(1 + yearlyRate, parsedTenure);

      setRequiredInvestment(investment);
      
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
        calculateRequiredInvestment(
          type === 'targetAmount' ? value : targetAmount,
          type === 'rate' ? value : rate,
          type === 'tenure' ? value : tenure,
          false
        );
      }
    }
  };

  const handleCalculateClick = () => {
    calculateRequiredInvestment(targetAmount, rate, tenure, true);
  };

  const handleReset = () => {
    setTargetAmount(initialState.targetAmount);
    setRate(initialState.rate);
    setTenure(initialState.tenure);
    setRequiredInvestment(initialState.requiredInvestment);
    setShowResult(initialState.showResult);
    setIsFirstCalculation(initialState.isFirstCalculation);
  };

  return (
    <div className="reverse-sip-modal">
      <div className="reverse-sip-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required Investment Calculator</h2>
        <p>Calculate the required one-time investment to reach your target amount</p>

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
          <button 
            className="calculate-button" 
            onClick={handleCalculateClick} 
            disabled={!targetAmount || !rate || !tenure}
          >
            Calculate Required Investment
          </button>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>

        {showResult && targetAmount && rate && (
          <div className="result-container">
            <p>Required One-time Investment: ₹{Math.round(requiredInvestment).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseInt(targetAmount).toLocaleString('en-IN')}</p>
            <p>Time Period: {tenure} years</p>
            <p>Expected Return: {rate}% p.a.</p>
            <p className="note">This is the required one-time investment needed to reach your target amount.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReverseLumpsumCalculator;