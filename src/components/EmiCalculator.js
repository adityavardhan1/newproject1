import React, { useState, useCallback, useEffect } from 'react';
import '../Sip.css';
import useScrollToTop from '../hooks/useScrollToTop';

function EmiCalculator() {
  useScrollToTop();

  const [state, setState] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
    showResult: false,
    isFirstCalculation: true
  });

  const formatAmount = useCallback((num) => {
    return num >= 10000000 
      ? `₹${(num / 10000000).toFixed(2)} Cr` 
      : `₹${(num / 100000).toFixed(2)} Lakh`;
  }, []);

  const calculateEmi = useCallback((isButtonClick = false) => {
    const principal = parseFloat(state.loanAmount.replace(/,/g, "")) || 0;
    const ratePerMonth = parseFloat(state.interestRate) / (12 * 100) || 0;
    const numberOfPayments = parseFloat(state.loanTerm) * 12 || 0;

    if (principal <= 0 || ratePerMonth <= 0 || numberOfPayments <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    const emiAmount = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments) / (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);
    const totalPaymentAmount = emiAmount * numberOfPayments;
    const totalInterestAmount = totalPaymentAmount - principal;

    setState(prev => ({
      ...prev,
      emi: emiAmount,
      totalInterest: totalInterestAmount,
      totalPayment: totalPaymentAmount,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, [state.loanAmount, state.interestRate, state.loanTerm]);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateEmi(false);
      }
    }
  }, [state.isFirstCalculation, calculateEmi]);

  const handleReset = useCallback(() => {
    setState({
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      showResult: false,
      isFirstCalculation: true
    });
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>EMI Calculator</h2>
              <p className="calculator-intro">Calculate your Equated Monthly Installment (EMI) for loans.</p>

              {[
                { field: 'loanAmount', label: 'Loan Amount', placeholder: '100000' },
                { field: 'interestRate', label: 'Annual Interest Rate (%)', placeholder: '10' },
                { field: 'loanTerm', label: 'Loan Term (Years)', placeholder: '5' }
              ].map(({ field, label, placeholder }) => (
                <div className="input-group" key={field}>
                  <label htmlFor={field}>{label} *</label>
                  <input
                    type="text"
                    id={field}
                    placeholder={`Ex: ${placeholder}`}
                    value={state[field]}
                    onChange={(e) => handleInputChange(e.target.value, field)}
                    autoComplete="off"
                  />
                </div>
              ))}

              <div className="button-container">
                <button 
                  className="calculate-button" 
                  onClick={() => calculateEmi(true)} 
                  disabled={!state.loanAmount || !state.interestRate || !state.loanTerm}
                >
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <p>Monthly EMI: {formatAmount(state.emi)}</p>
                  <p>Total Interest: {formatAmount(state.totalInterest)}</p>
                  <p>Total Payment: {formatAmount(state.totalPayment)}</p>
                  <p className="note">* This is an approximate calculation. Actual EMI may vary based on other factors.</p>
                  <p className="note">
                    This calculator is for educational purposes only and should not be considered as financial advice.
                    The actual EMI may vary based on the lender's terms and conditions, processing fees, and other charges.
                    Always consult with your lender or a qualified financial advisor before making any loan decisions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator; 