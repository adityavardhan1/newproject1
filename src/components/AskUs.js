import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AskUs.css';

const AskUs = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 style={{'color': '#007bff'}}>Ask Us. <br/>48 hrs Response Guarantee</h1>
        <p className="home-description">
            We are on the mission to make personal finance knowledge accessible to everyone.<br/>
            If you have any questions or doubts about personal finance, we are here to help you.
            <br/>
            <br/>
            <p style={{'font-weight': 'bold'}}>
            Remember, all information provided by us is for educational purposes only.
            We do not provide any financial advice or recommendations.
            We are not responsible for any financial decisions made based on the information provided.
            Please consult with a qualified financial advisor before making any investment decisions.
            We are committed to providing you with the best possible service and support.
            </p>

        </p>
        <div className="calculator-cards">
          <Link to="/lumpsum" className="calculator-card">
            <h2>Ask Us Anything</h2>
            <h3>Rs 49/=</h3>
            <br/>
            <p>We are hear to give help you in your personal finance</p>
          </Link>
          
          <Link to="/sip" className="calculator-card">
            <h2>Want to Plan Retirement</h2>
            <h3>Rs 99/=</h3>
            <br/>
            <p>If you want to plan your retirement. Connect with us</p>
          </Link>
          
          <Link to="/time" className="calculator-card">
          <h2>Want to own Home</h2>
          <h3>Rs 149/=</h3>
          <br/> 
            <p>If you want to buy home. We can help you plan</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskUs; 