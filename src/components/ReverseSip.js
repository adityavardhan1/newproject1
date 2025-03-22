import React, { useState } from 'react';
import '../Sip.css';

function ReverseSipCalculator({ onClose }) {
  const initialState = {
    targetAmount: '',
    rate: '',
    tenure: '',
    requiredSip: 0,
    showResult: false
  };

  const [targetAmount, setTargetAmount] = useState(initialState.targetAmount);
  const [rate, setRate] = useState(initialState.rate);
  const [tenure, setTenure] = useState(initialState.tenure);
  const [requiredSip, setRequiredSip] = useState(initialState.requiredSip);
  const [showResult, setShowResult] = useState(initialState.showResult);

  const calculateRequiredSip = () => {
    const parsedTarget = parseFloat(targetAmount.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    if (parsedTarget <= 0 || parsedRate <= 0 || parsedTenure <= 0) {
      alert('Please enter valid positive numbers for all fields');
      return;
    }

    const monthlyRate = parsedRate / (12 * 100);
    const months = parsedTenure * 12;
    
    const numerator = parsedTarget;
    const denominator = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const sipAmount = numerator / denominator;

    setRequiredSip(sipAmount);
    setShowResult(true);
  };

  const handleReset = () => {
    setTargetAmount(initialState.targetAmount);
    setRate(initialState.rate);
    setTenure(initialState.tenure);
    setRequiredSip(initialState.requiredSip);
    setShowResult(initialState.showResult);
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
            onChange={(e) => setTargetAmount(e.target.value)}
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
            onChange={(e) => setRate(e.target.value)}
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
            onChange={(e) => setTenure(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="button-container">
          <button 
            className="calculate-button" 
            onClick={calculateRequiredSip}
            disabled={!targetAmount || !rate || !tenure}
          >
            Calculate Required SIP
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && targetAmount && rate && tenure && (
          <div className="result-container">
            <p>Required Monthly SIP: ₹{Math.round(requiredSip).toLocaleString('en-IN')}</p>
            <p>Target Amount: ₹{parseFloat(targetAmount).toLocaleString('en-IN')}</p>
            <p>Time Period: {tenure} years</p>
            <p>Expected Return: {rate}% p.a.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReverseSipCalculator;