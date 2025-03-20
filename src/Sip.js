import React, { useState } from 'react';
import './Sip.css'; // Make sure you have Sip.css in the same directory

function SIPCalculator() {
  const [frequency, setFrequency] = useState('monthly');
  const [investment, setInvestment] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [futureValue, setFutureValue] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculateSip = () => {
    const parsedInvestment = parseFloat(investment.replace(/,/g, "")) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedTenure = parseFloat(tenure) || 0;

    let schedule;
    switch (frequency) {
      case 'monthly':
        schedule = 12;
        break;
      // Add other frequency options if needed
      default:
        schedule = 12;
    }

    const r = parsedRate / 100 / schedule;
    const n = parsedTenure * schedule;
    const a = parsedInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalDepositedCalc = parsedInvestment * n;
    const totalEarningsCalc = a - totalDepositedCalc;

    setFutureValue(a);
    setTotalEarnings(totalEarningsCalc);
    setTotalDeposited(totalDepositedCalc);
    setShowResult(true);
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleReset = () => {
    setInvestment('10000');
    setRate('12');
    setTenure('10');
    setShowResult(false);
  };

  const formatLakhs = (num) => {
    const lakhs = (num / 100000).toFixed(2);
    return `${lakhs} Lakhs`;
  };

  return (
    <div>
    <h1 className="center"> SIP Calculator</h1>
    <div className="sip-calculator">
      <div className="content-left">
        <h2>Systematic Investment Plan (SIP) Calculator</h2>
        <p>
          Wish to invest periodically? Calculate the amount of wealth that you
          can generate using our SIP Calculator.
        </p>

        <div className="input-group">
          <label htmlFor="frequency">Frequency of Investment:</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            {/* Add other frequency options if needed */}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="investment">Monthly Investment Amount *</label>
          <input
            type="text"
            id="investment"
            placeholder="Ex: 10000"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
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
          <label htmlFor="tenure">Tenure (in years) (Up to 50 years)</label>
          <input
            type="text"
            id="tenure"
            placeholder="Ex: 10"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button className="calculate-button" onClick={calculateSip}>
            Plan My Wealth
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showResult && (
          <div className="result-container">
            <p>
              Your Future Value: {formatNumber(futureValue)} (
              {formatLakhs(futureValue)})
            </p>
            <p>
              Total Earnings: {formatNumber(totalEarnings)} (
              {formatLakhs(totalEarnings)})
            </p>
            <p>
              Total Amount Deposited: {formatNumber(totalDeposited)} (
              {formatLakhs(totalDeposited)})
            </p>
          </div>
        )}
      </div>

      <div className="image-right">
        <img
          src="/calculator/craiyon_173453_Visualize_business_growth_through_a_series_of_ascending_steps_with_charts_and_coins__multicolor.png"
          alt="Money Bag"
        />
      </div>
    </div>
    </div>
  );
}

export default SIPCalculator;