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
    const formattedNumber = new Intl.NumberFormat('en-IN').format(Math.round(num));
    const inThousands = (num / 1000).toFixed(2);
    const inLakhs = (num / 100000).toFixed(2);
    const inCrores = (num / 10000000).toFixed(2);
    
    if (num >= 10000000) {
      return `${formattedNumber} (₹${inCrores} Cr)`;
    } else if (num >= 100000) {
      return `${formattedNumber} (₹${inLakhs} Lakh)`;
    } else {
      return `${formattedNumber} (₹${inThousands} Thousand)`;
    }
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
              <p className="calculator-intro">
                Calculate your Equated Monthly Installment (EMI) for loans
              </p>

              <div className="input-group">
                <label htmlFor="loanAmount">Loan Amount (₹)</label>
                <input
                  type="text"
                  id="loanAmount"
                  value={state.loanAmount}
                  onChange={(e) => handleInputChange(e.target.value, 'loanAmount')}
                  placeholder="Enter loan amount"
                />
              </div>

              <div className="input-group">
                <label htmlFor="interestRate">Annual Interest Rate (%)</label>
                <input
                  type="text"
                  id="interestRate"
                  value={state.interestRate}
                  onChange={(e) => handleInputChange(e.target.value, 'interestRate')}
                  placeholder="Enter annual interest rate"
                />
              </div>

              <div className="input-group">
                <label htmlFor="loanTerm">Loan Term (Years)</label>
                <input
                  type="text"
                  id="loanTerm"
                  value={state.loanTerm}
                  onChange={(e) => handleInputChange(e.target.value, 'loanTerm')}
                  placeholder="Enter loan term in years"
                />
              </div>

              <div className="button-container">
                <button className="calculate-button" onClick={() => calculateEmi(true)}>
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <h2>Results</h2>
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