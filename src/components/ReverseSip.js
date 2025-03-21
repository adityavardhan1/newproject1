import React, { useState } from 'react';
import '../Sip.css';

function ReverseSipCalculator({ onClose }) {
  const [targetAmount, setTargetAmount] = useState('');
  const [rate, setRate] = useState('12');
  const [tenure, setTenure] = useState('10');
  const [requiredSip, setRequiredSip] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculateRequiredSip = () => {
    const parsedTarget = parseFloat(targetAmount.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    const monthlyRate = parsedRate / (12 * 100);
    const months = parsedTenure * 12;
    
    const numerator = parsedTarget;
    const denominator = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const sipAmount = numerator / denominator;

    setRequiredSip(sipAmount);
    setShowResult(true);
  };

  const handleReset = () => {
    setTargetAmount('');
    setRate('12');
    setTenure('10');
    setShowResult(false);
  };

  return (
    <div className="reverse-sip-modal">
      <div className="reverse-sip-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Target Amount SIP Calculator</h2>
        <p>Calculate required monthly SIP for your target amount</p>

        <div className="input-group">
          <label htmlFor="targetAmount">Target Amount *</label>
          <input
            type="text"
            id="targetAmount"
            placeholder="Ex: 1000000"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
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
          />
        </div>

        <div className="button-container">
          <button className="calculate-button" onClick={calculateRequiredSip}>
            Calculate Required SIP
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && (
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