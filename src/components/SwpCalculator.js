import React, { useState, useCallback, useEffect } from 'react';
import '../Sip.css';
import useScrollToTop from '../hooks/useScrollToTop';

function SwpCalculator() {
  useScrollToTop();

  const [state, setState] = useState({
    corpus: '',
    withdrawal: '',
    rate: '',
    tenure: '',
    monthlyWithdrawal: 0,
    totalWithdrawal: 0,
    remainingCorpus: 0,
    showResult: false,
    isFirstCalculation: true
  });

  const formatAmount = useCallback((num) => {
    return num >= 10000000 
      ? `₹${(num / 10000000).toFixed(2)} Cr` 
      : `₹${(num / 100000).toFixed(2)} Lakh`;
  }, []);

  const calculateSwp = useCallback((isButtonClick = false) => {
    const corpus = parseFloat(state.corpus.replace(/,/g, "")) || 0;
    const withdrawal = parseFloat(state.withdrawal.replace(/,/g, "")) || 0;
    const rate = parseFloat(state.rate) || 0;
    const tenure = parseFloat(state.tenure) || 0;

    if (corpus <= 0 || withdrawal <= 0 || rate <= 0 || tenure <= 0) {
      if (isButtonClick) {
        alert('Please enter valid positive numbers for all fields');
      }
      return;
    }

    const monthlyRate = rate / (12 * 100);
    const numberOfMonths = tenure * 12;
    const monthlyWithdrawalAmount = withdrawal;
    const totalWithdrawalAmount = monthlyWithdrawalAmount * numberOfMonths;
    
    // Calculate remaining corpus using the formula: P = PMT * ((1 - (1 + r)^-n) / r)
    // where P is the corpus, PMT is monthly withdrawal, r is monthly rate, n is number of months
    const requiredCorpus = monthlyWithdrawalAmount * ((1 - Math.pow(1 + monthlyRate, -numberOfMonths)) / monthlyRate);
    const remainingCorpusAmount = corpus - requiredCorpus;

    setState(prev => ({
      ...prev,
      monthlyWithdrawal: monthlyWithdrawalAmount,
      totalWithdrawal: totalWithdrawalAmount,
      remainingCorpus: remainingCorpusAmount,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation
    }));
  }, [state.corpus, state.withdrawal, state.rate, state.tenure]);

  const handleInputChange = useCallback((value, field) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(prev => ({ ...prev, [field]: value }));
      if (!state.isFirstCalculation) {
        calculateSwp(false);
      }
    }
  }, [state.isFirstCalculation, calculateSwp]);

  const handleReset = useCallback(() => {
    setState({
      corpus: '',
      withdrawal: '',
      rate: '',
      tenure: '',
      monthlyWithdrawal: 0,
      totalWithdrawal: 0,
      remainingCorpus: 0,
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
              <h2>SWP Calculator</h2>
              <p className="calculator-intro">Calculate your Systematic Withdrawal Plan (SWP) for regular income from investments.</p>

              {[
                { field: 'corpus', label: 'Initial Investment Amount', placeholder: '1000000' },
                { field: 'withdrawal', label: 'Monthly Withdrawal Amount', placeholder: '10000' },
                { field: 'rate', label: 'Expected Rate of Return (P.A)', placeholder: '8' },
                { field: 'tenure', label: 'Time Period (in years)', placeholder: '10' }
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
                  onClick={() => calculateSwp(true)} 
                  disabled={!state.corpus || !state.withdrawal || !state.rate || !state.tenure}
                >
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <p>Monthly Withdrawal: {formatAmount(state.monthlyWithdrawal)}</p>
                  <p>Total Withdrawal: {formatAmount(state.totalWithdrawal)}</p>
                  <p>Remaining Corpus: {formatAmount(state.remainingCorpus)}</p>
                  <p className="note">* This is an approximate calculation. Actual returns may vary based on market conditions.</p>
                  
                  <p className="note">
                    This calculator is for educational purposes only and should not be considered as financial advice.
                    Investment returns are not guaranteed, and past performance does not guarantee future results.
                    The calculation assumes a constant rate of return, which may not be realistic in actual market conditions.
                    Always consult with a qualified financial advisor before making investment decisions.
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

export default SwpCalculator; 