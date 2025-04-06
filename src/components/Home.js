import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
   <div> 
    <div className="home-container">
      <div className="home-content">
        <h1 style={{'color': '#007bff'}}>Know about Personal Finance for FREE!!!</h1>
        <p className="home-description" style={{'font-weight': 'bold'}}>
          We are dedicated to helping you achieve your financial goals. 
          <br/>
          <br/>
          We organizes financial literacy programs and workshops to educate individuals about personal finance, investment strategies, and wealth management.
          Our mission is to empower individuals with the knowledge and tools they need to make informed financial decisions.
          We believe that financial literacy is the key to building a secure and prosperous future.
          Whether you're just starting out or looking to enhance your financial knowledge, we have something for everyone.
          Join us on this journey towards financial empowerment and take control of your financial future today!
        </p>
        
        <div className="calculator-cards">
          <Link to="/lumpsum" className="calculator-card">
            <h2 style={{'color': 'darkblue'}}>Personal Finance Part 1</h2>
            <p style={{'font-weight': 'bold'}}>11th May,2025  11:00 AM-12:00 PM
            <br/>
            Online</p>  
            <br/>
            <p>Join us for an informative session on personal finance, covering budgeting, saving, and investing.</p>
          </Link>
          
          <Link to="/sip" className="calculator-card">
            <h2 style={{'color': 'darkblue'}}>Personal Finance Part 2</h2>
            <p style={{'font-weight': 'bold'}}>11th May,2025  11:00 AM-12:00 PM
            <br/>
            Online</p>
            <br/>
            <p>Join us for an informative session on personal finance, covering budgeting, saving, and investing.</p>
          </Link>
          
          <Link to="/time" className="calculator-card">
          <h2 style={{'color': 'darkblue'}}>Personal Finance Part 3</h2>
            <p style={{'font-weight': 'bold'}}>11th May,2025  11:00 AM-12:00 PM
            <br/>
            Online</p>
            <br/>
            <p>Join us for an informative session on personal finance, covering budgeting, saving, and investing.</p>
          </Link>
        </div>
      </div>
    </div>
    <div className="home-container">
      <div className="home-content">
        <h1 style={{'color': '#007bff'}}>Have any doubt? Ask Us!!!</h1>
        <p className="home-description" style={{'font-weight': 'bold'}}>
          Pay Rs 49/= to get your query answered by our experts.
          <br/>
          <br/>
          We guarantee a response within 48 hours.
          <br/>
          We are committed to providing you with the best possible service and support
        </p>
        
        <div className="calculator-cards">
           <Link to="/lumpsum" className="calculator-card">
              <h2 style={{'color': 'darkblue'}}>Ask Us Anything</h2>
              <h3>Rs 49/=</h3>
              <br/>
              <p>We are hear to give help you in your personal finance</p>
           </Link>
                   
          <Link to="/sip" className="calculator-card">
             <h2 style={{'color': 'darkblue'}}>Want to Plan Retirement</h2>
              <h3>Rs 99/=</h3>
              <br/>
               <p>If you want to plan your retirement. Connect with us</p>
          </Link>
                   
          <Link to="/time" className="calculator-card">
            <h2 style={{'color': 'darkblue'}}>Want to own Home</h2>
            <h3>Rs 149/=</h3>
            <br/>
            <p>If you want to buy home. We can help you plan</p>
          </Link>
        </div>
      </div>  
    </div>
  </div>
  );
}

export default Home;