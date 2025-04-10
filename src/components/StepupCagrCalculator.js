import React, { useState } from 'react';
import '../Sip.css';

const StepupCagrCalculator = ({ onClose }) => {
  const [state, setState] = useState({
    monthlyInvestment: '',
    targetAmount: '',
    tenure: '',
    stepUpPercentage: '',
    requiredCAGR: 0,
    showResult: false,
    finalAmount: 0,
    totalInvested: 0,
    amountWithoutStepUp: 0,
    isFirstCalculation: true,
    targetReachable: false
  });

  const calculateValues = (rate, monthly, years, stepUp) => {
    const monthlyRate = rate / 100 / 12;
    let investment = monthly;
    let totalValue = 0;
    let totalInvested = 0;
    let amountWithoutStepUp = 0;

    // Calculate amount without step-up first
    let baseInvestment = monthly;
    for (let year = 0; year < years; year++) {
      for (let month = 0; month < 12; month++) {
        amountWithoutStepUp = (amountWithoutStepUp + baseInvestment) * (1 + monthlyRate);
      }
    }

    // Calculate with step-up
    investment = monthly;
    for (let year = 0; year < years; year++) {
      for (let month = 0; month < 12; month++) {
        totalInvested += investment;
        totalValue = (totalValue + investment) * (1 + monthlyRate);
      }
      if (stepUp > 0) {
        investment *= (1 + stepUp / 100);
      }
    }

    return { totalValue, totalInvested, amountWithoutStepUp };
  };

  const calculateRequiredCAGR = () => {
    const monthly = parseFloat(state.monthlyInvestment.replace(/,/g, '')) || 0;
    const target = parseFloat(state.targetAmount.replace(/,/g, '')) || 0;
    const years = parseFloat(state.tenure) || 0;
    const stepUp = parseFloat(state.stepUpPercentage) || 0;

    if (monthly > 0 && target > 0 && years > 0) {
      try {
        let low = 0;
        let high = 100;
        let iterations = 0;
        const maxIterations = 100;
        const epsilon = 0.0001;
        let foundRate = false;

        while (iterations < maxIterations) {
          const currentRate = (low + high) / 2;
          const { totalValue, totalInvested, amountWithoutStepUp } = calculateValues(
            currentRate, monthly, years, stepUp
          );

          if (Math.abs(totalValue - target) < target * epsilon) {
            setState(prev => ({
              ...prev,
              requiredCAGR: currentRate,
              finalAmount: totalValue,
              totalInvested: totalInvested,
              amountWithoutStepUp: amountWithoutStepUp,
              showResult: true,
              isFirstCalculation: false,
              targetReachable: true
            }));
            foundRate = true;
            break;
          }

          if (totalValue < target) {
            low = currentRate;
          } else {
            high = currentRate;
          }
          iterations++;
        }

        if (!foundRate) {
          setState(prev => ({
            ...prev,
            showResult: true,
            isFirstCalculation: false,
            targetReachable: false
          }));
        }
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

      if (!state.isFirstCalculation) {
        setTimeout(() => calculateRequiredCAGR(), 0);
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
      stepUpPercentage: '',
      requiredCAGR: 0,
      showResult: false,
      finalAmount: 0,
      totalInvested: 0,
      amountWithoutStepUp: 0,
      isFirstCalculation: true,
      targetReachable: false
    });
  };

  return (
    <div className="reverse-modal">
      <div className="reverse-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Required Rate of Return (CAGR) Calculator</h2>
        <p className="calculator-intro">Calculate the required rate of return needed to reach your target amount with yearly step-up</p>

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
          <label htmlFor="stepUpPercentage">Yearly Step-up Percentage *</label>
          <input
            type="text"
            id="stepUpPercentage"
            placeholder="Ex: 5"
            value={state.stepUpPercentage}
            onChange={(e) => handleInputChange(e.target.value, 'stepUpPercentage')}
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

        <div className="button-container">
          <button 
            className="calculate-button"
            onClick={calculateRequiredCAGR}
            disabled={!state.monthlyInvestment || !state.targetAmount || !state.tenure}
          >
            Calculate Required Rate
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
            {state.targetReachable ? (
              <>
                <h3>Required Rate Analysis</h3>
                <div className="result-details">
                  <p>Required Rate of Return (CAGR): {state.requiredCAGR.toFixed(2)}% p.a.</p>
                  <p>Initial Monthly Investment: {formatAmount(state.monthlyInvestment)}</p>
                  <p>Yearly Step-up: {state.stepUpPercentage}%</p>
                  <p>Total Amount Invested: {formatAmount(state.totalInvested)}</p>
                  <p>Amount Without Step-up: {formatAmount(state.amountWithoutStepUp)}</p>
                  <p>Final Amount With Step-up: {formatAmount(state.finalAmount)}</p>
                  <p>Additional Amount from Step-up: {formatAmount(state.finalAmount - state.amountWithoutStepUp)}</p>
                  <p>Total Interest Earned: {formatAmount(state.finalAmount - state.totalInvested)}</p>
                  <p>Time Period: {state.tenure} years</p>
                </div>
                <div className="note">
                  <p>* Calculations assume:</p>
                  <ul>
                    <li>Step-up is applied at the beginning of each year</li>
                    <li>Returns are compounded monthly</li>
                    <li>Constant rate of return throughout the investment period</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="result-details">
                <h3>Target May Not Be Achievable</h3>
                <p>With the current investment amount, step-up percentage, and time period, your target amount might be too ambitious. Consider:</p>
                <ul>
                  <li>Increasing your monthly investment</li>
                  <li>Extending your investment period</li>
                  <li>Increasing your yearly step-up percentage</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepupCagrCalculator;