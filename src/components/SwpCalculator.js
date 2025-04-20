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
    isFirstCalculation: true,
    depletionTime: null
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

  const calculateDepletionTime = useCallback((corpus, monthlyWithdrawal, monthlyRate) => {
    // Formula: n = log(1 - (P*r)/PMT) / log(1 + r)
    // where P is corpus, PMT is monthly withdrawal, r is monthly rate
    const n = Math.log(1 - (corpus * monthlyRate) / monthlyWithdrawal) / Math.log(1 + monthlyRate);
    const years = Math.floor(n / 12);
    const months = Math.ceil(n % 12);
    return { years, months };
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
    
    console.log('Initial values:', {
      corpus,
      monthlyWithdrawalAmount,
      monthlyRate,
      numberOfMonths
    });
    
    // Calculate month by month to track corpus depletion
    let currentCorpus = corpus;
    let monthsToDepletion = null;
    
    for (let month = 1; month <= numberOfMonths; month++) {
      // Add monthly interest
      const interest = currentCorpus * monthlyRate;
      currentCorpus = currentCorpus + interest;
      // Subtract monthly withdrawal
      currentCorpus = currentCorpus - monthlyWithdrawalAmount;
      
      console.log(`Month ${month}:`, {
        interest,
        afterInterest: currentCorpus + monthlyWithdrawalAmount,
        afterWithdrawal: currentCorpus
      });
      
      // If corpus is depleted, record the month
      if (currentCorpus <= 0 && monthsToDepletion === null) {
        monthsToDepletion = month;
      }
    }

    // Calculate depletion time if corpus was depleted
    let depletionTime = null;
    if (monthsToDepletion !== null) {
      const years = Math.floor(monthsToDepletion / 12);
      const months = monthsToDepletion % 12;
      depletionTime = { years, months };
    }

    console.log('Final values:', {
      currentCorpus,
      monthsToDepletion,
      depletionTime
    });

    setState(prev => ({
      ...prev,
      monthlyWithdrawal: monthlyWithdrawalAmount,
      totalWithdrawal: totalWithdrawalAmount,
      remainingCorpus: currentCorpus > 0 ? currentCorpus : 0,
      showResult: true,
      isFirstCalculation: isButtonClick ? false : prev.isFirstCalculation,
      depletionTime
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
      isFirstCalculation: true,
      depletionTime: null
    });
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="sip-calculator">
          <div className="content-left">
            <div className="calculator-box">
              <h2>SWP Calculator</h2>
              <p className="calculator-intro">
                Calculate your Systematic Withdrawal Plan (SWP) for regular income from investments
              </p>

              <div className="input-group">
                <label htmlFor="corpus">Initial Investment Amount (₹)</label>
                <input
                  type="text"
                  id="corpus"
                  value={state.corpus}
                  onChange={(e) => handleInputChange(e.target.value, 'corpus')}
                  placeholder="Enter initial investment amount"
                />
              </div>

              <div className="input-group">
                <label htmlFor="withdrawal">Monthly Withdrawal Amount (₹)</label>
                <input
                  type="text"
                  id="withdrawal"
                  value={state.withdrawal}
                  onChange={(e) => handleInputChange(e.target.value, 'withdrawal')}
                  placeholder="Enter monthly withdrawal amount"
                />
              </div>

              <div className="input-group">
                <label htmlFor="rate">Expected Annual Return (%)</label>
                <input
                  type="text"
                  id="rate"
                  value={state.rate}
                  onChange={(e) => handleInputChange(e.target.value, 'rate')}
                  placeholder="Enter expected annual return"
                />
              </div>

              <div className="input-group">
                <label htmlFor="tenure">Investment Period (Years)</label>
                <input
                  type="text"
                  id="tenure"
                  value={state.tenure}
                  onChange={(e) => handleInputChange(e.target.value, 'tenure')}
                  placeholder="Enter investment period in years"
                />
              </div>

              <div className="button-container">
                <button className="calculate-button" onClick={() => calculateSwp(true)}>
                  Calculate
                </button>
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>

              {state.showResult && (
                <div className="result-container">
                  <h2>Results</h2>
                  <p>Monthly Withdrawal: {formatAmount(state.monthlyWithdrawal)}</p>
                  <p>Total Withdrawal: {formatAmount(state.totalWithdrawal)}</p>
                  {state.remainingCorpus > 0 && (
                    <p>Remaining Corpus: {formatAmount(state.remainingCorpus)}</p>
                  )}
                  {state.depletionTime && (
                    <p className="warning">
                      Warning: Your corpus will be depleted in {Math.abs(state.depletionTime.years)} years and {Math.abs(state.depletionTime.months)} months. 
                      Please reduce your withdrawal amount or increase your corpus to sustain the withdrawals.
                    </p>
                  )}
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