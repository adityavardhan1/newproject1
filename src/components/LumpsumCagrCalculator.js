import React, { useState } from 'react';
import '../Sip.css';

function LumpsumCagrCalculator({ onClose }) {
  const initialState = {
    investment: '',
    targetAmount: '',
    tenure: '',
    requiredCagr: 0,
    showResult: false,
    isFirstCalculation: true
  };

  const [investment, setInvestment] = useState(initialState.investment);
  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [tenure, setTenure] = useState(initialState.tenure);
  const [requiredCagr, setRequiredCagr] = useState(initialState.requiredCagr);
  const [showResult, setShowResult] = useState(initialState.showResult);
  const [isFirstCalculation, setIsFirstCalculation] = useState(initialState.isFirstCalculation);

  const calculateRequiredCagr = (inv = investment, tAmount = targetAmount, tTenure = tenure, isButtonClick = false) => {
    const parsedInvestment = parseFloat(inv.replace(/,/g, "")) || 0;
    const parsedTarget = parseFloat(tAmount.replace(/,/g, "")) || 0;
    const parsedTenure = parseFloat(tTenure) || 0;

    if (parsedInvestment > 0 && parsedTarget > 0 && parsedTenure > 0) {
      const cagr = (Math.pow(parsedTarget / parsedInvestment, 1 / parsedTenure) - 1) * 100;
      setRequiredCagr(cagr);
      
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
        calculateRequiredCagr(
          type === 'investment' ? value : investment,
          type === 'targetAmount' ? value : targetAmount,
          type === 'tenure' ? value : tenure,
          false
        );
      }
    }
  };

  const handleReset = () => {
    setInvestment(initialState.investment);
    setTargetAmount(initialState.targetAmount);
    setTenure(initialState.tenure);
    setRequiredCagr(initialState.requiredCagr);
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
            onClick={() => calculateRequiredCagr(investment, targetAmount, tenure, true)}
            disabled={!investment || !targetAmount || !tenure}
          >
            Calculate Required CAGR
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && (
          <div className="result-container">
            <p>Required CAGR: {requiredCagr.toFixed(2)}% p.a.</p>
            <p>Investment Amount: ₹{parseFloat(investment).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseFloat(targetAmount).toLocaleString('en-IN')}</p>
            <p>Time Period: {tenure} years</p>
            <p className="note">This is the required annual growth rate to grow your investment to the target amount.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LumpsumCagrCalculator;