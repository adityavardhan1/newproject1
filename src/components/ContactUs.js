import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const ContactUs = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 style={{'color': '#007bff'}}>Do you want to give us feedback or want to connect?</h1>
        <p className="home-description">
            Send us feedback or connect with us through our email.
            <br/>
            <br/>
            hello@NitiDhan.com
            <br/>
            <br/>
            Every feedback is valuable to us. your feddback will help us improve our services and provide you with the best possible experience.
        </p>
        </div>
      </div>
  );
}

export default ContactUs;