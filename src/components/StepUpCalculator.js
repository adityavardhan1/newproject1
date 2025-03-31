import React, { useState } from 'react';
import '../Sip.css';

const StepUpCalculator = ({ onClose }) => {
  const [state, setState] = useState({
    monthlyInvestment: '',
    targetAmount: '',
    tenure: '',
    rate: '',
    requiredStepUp: 0,
    showResult: false,
    finalAmount: 0,
    totalInvested: 0,
    amountWithoutStepUp: 0,
    noStepUpNeeded: false,
    isFirstCalculation: true
  });

  const calculateRequiredStepUp = () => {
    const monthly = parseFloat(state.monthlyInvestment.replace(/,/g, '')) || 0;
    const target = parseFloat(state.targetAmount.replace(/,/g, '')) || 0;
    const years = parseFloat(state.tenure) || 0;
    const rate = parseFloat(state.rate) || 0;

    if (monthly > 0 && target > 0 && years > 0 && rate > 0) {
      try {
        const monthlyRate = rate / 100 / 12;
        let investment = monthly;
        let totalValue = 0;
        let totalInvested = 0;

        // Calculate without step-up first
        for (let year = 0; year < years; year++) {
          for (let month = 0; month < 12; month++) {
            totalInvested += monthly;
            totalValue = (totalValue + monthly) * (1 + monthlyRate);
          }
        }

        // Store amount without step-up
        const amountWithoutStepUp = totalValue;

        if (totalValue >= target) {
          setState(prev => ({
            ...prev,
            requiredStepUp: 0,
            finalAmount: totalValue,
            totalInvested: totalInvested,
            amountWithoutStepUp: totalValue,
            showResult: true,
            noStepUpNeeded: true,
            isFirstCalculation: false
          }));
          return;
        }

        // Calculate required step-up
        let low = 0;
        let high = 100;
        let stepUp = 0;
        let iterations = 0;
        const maxIterations = 100;
        const epsilon = 0.0001;

        while (iterations < maxIterations) {
          stepUp = (low + high) / 2;
          investment = monthly;
          totalValue = 0;
          totalInvested = 0;

          for (let year = 0; year < years; year++) {
            for (let month = 0; month < 12; month++) {
              totalInvested += investment;
              totalValue = (totalValue + investment) * (1 + monthlyRate);
            }
            investment *= (1 + stepUp / 100);
          }

          if (Math.abs(totalValue - target) < target * epsilon) {
            break;
          }

          if (totalValue < target) {
            low = stepUp;
          } else {
            high = stepUp;
          }
          iterations++;
        }

        setState(prev => ({
          ...prev,
          requiredStepUp: Math.max(0, stepUp),
          finalAmount: totalValue,
          totalInvested: totalInvested,
          amountWithoutStepUp: amountWithoutStepUp,
          showResult: true,
          noStepUpNeeded: false,
          isFirstCalculation: false
        }));
      } catch (error) {
        console.error('Calculation error:', error);
      }
    }
  };

  const handleInputChange = (value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({
        ...prev,
        [field]: value
      }));

      // Recalculate only if not first calculation
      if (!state.isFirstCalculation) {
        setTimeout(() => calculateRequiredStepUp(), 0);
      }
    }
  };

  const formatAmount = (num) => {
    const amount = parseFloat(num);
    if (isNaN(amount)) return '₹0';
    return amount >= 10000000 
      ? `₹${(amount / 10000000).toFixed(2)} Cr` 
      : amount >= 100000 
      ? `₹${(amount / 100000).toFixed(2)} Lakh`
      : `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleReset = () => {
    setState({
      monthlyInvestment: '',
      targetAmount: '',
      tenure: '',
      rate: '',
      requiredStepUp: 0,
      showResult: false,
      finalAmount: 0,
      totalInvested: 0,
      amountWithoutStepUp: 0,
      noStepUpNeeded: false,
      isFirstCalculation: true
    });
  };

  return (
    <div className="reverse-modal">
      <div className="reverse-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required Step-up Percentage Calculator</h2>
        <p className="calculator-intro">Calculate the yearly step-up percentage needed to reach your target amount</p>

        <div className="input-group">
          <label htmlFor="monthlyInvestment">Current Monthly SIP Amount *</label>
          <input
            type="text"
            id="monthlyInvestment"
            placeholder="Ex: 10000"
            value={state.monthlyInvestment}
            onChange={(e) => handleInputChange(e.target.value, 'monthlyInvestment')}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="targetAmount">Target Amount *</label>
          <input
            type="text"
            id="targetAmount"
            placeholder="Ex: 10000000"
            value={state.targetAmount}
            onChange={(e) => handleInputChange(e.target.value, 'targetAmount')}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="tenure">Time Period (in years) *</label>
          <input
            type="text"
            id="tenure"
            placeholder="Ex: 10"
            value={state.tenure}
            onChange={(e) => handleInputChange(e.target.value, 'tenure')}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="rate">Expected Rate of Return (P.A) *</label>
          <input
            type="text"
            id="rate"
            placeholder="Ex: 12"
            value={state.rate}
            onChange={(e) => handleInputChange(e.target.value, 'rate')}
            autoComplete="off"
          />
        </div>

        <div className="button-container">
          <button 
            className="calculate-button"
            onClick={calculateRequiredStepUp}
            disabled={!state.monthlyInvestment || !state.targetAmount || !state.tenure || !state.rate}
          >
            Calculate Required Step-up
          </button>
          <button 
            className="reset-button" 
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {state.showResult && (
          <div className="result-container">
            {state.noStepUpNeeded ? (
              <>
                <h3>Good News! Your Current SIP is Sufficient</h3>
                <div className="result-details">
                  <p>Monthly Investment: {formatAmount(state.monthlyInvestment)}</p>
                  <p>Total Amount Invested: {formatAmount(state.totalInvested)}</p>
                  <p>Final Amount: {formatAmount(state.finalAmount)}</p>
                  <p>Total Interest Earned: {formatAmount(state.finalAmount - state.totalInvested)}</p>
                  <p>Time Period: {state.tenure} years</p>
                  <p>Expected Return Rate: {state.rate}% p.a.</p>
                </div>
              </>
            ) : (
              <>
                <h3>Step-up Required to Reach Your Goal</h3>
                <div className="result-details">
                  <p>Required Yearly Step-up: {state.requiredStepUp.toFixed(2)}%</p>
                  <p>Initial Monthly Investment: {formatAmount(state.monthlyInvestment)}</p>
                  <p>Total Amount Invested: {formatAmount(state.totalInvested)}</p>
                  <p>Amount Without Step-up: {formatAmount(state.amountWithoutStepUp)}</p>
                  <p>Final Amount With Step-up: {formatAmount(state.finalAmount)}</p>
                  <p>Additional Amount from Step-up: {formatAmount(state.finalAmount - state.amountWithoutStepUp)}</p>
                  <p>Total Interest Earned: {formatAmount(state.finalAmount - state.totalInvested)}</p>
                  <p>Time Period: {state.tenure} years</p>
                  <p>Expected Return Rate: {state.rate}% p.a.</p>
                </div>
              </>
            )}
            <div className="note">
              <p>Step-up is applied at the beginning of each year</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepUpCalculator;