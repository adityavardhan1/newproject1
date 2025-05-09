import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HamburgerMenu from './components/HamburgerMenu';
import Home from './components/Home';
import Calculator from './pages/Calculator';
import FIRE from './pages/FIRE';
import Login from './pages/Login';
import Market from './pages/Market';
import Signup from './pages/Signup';
import ContactUs from './components/ContactUs';
import SipCalculator from './components/SipCalculator';
import LumpsumCalculator from './components/LumpsumCalculator';
import TimeCalculator from './components/TimeCalculator';
import StepupCalculator from './components/StepUpCalculator';
import CagrCalculator from './components/CagrCalculator';
import LumpsumCagrCalculator from './components/LumpsumCagrCalculator';
import OneTimeInvestmentCalculator from './components/OneTimeInvestmentCalculator';
import EmiCalculator from './components/EmiCalculator';
import SwpCalculator from './components/SwpCalculator';
import About from './components/About';
import Footer from './components/Footer';
import AskUs from './components/AskUs';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="App" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!isMobile && <Navbar />}
        {isMobile && <HamburgerMenu />}
        <div className={`main-content ${isMobile ? 'mobile-content' : ''}`} style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lumpsum" element={<LumpsumCalculator />} />
            <Route path="/sip" element={<SipCalculator />} />
            <Route path="/time" element={<TimeCalculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/Calculator" element={<Calculator />} />
            <Route path="/Calculator/SipCalculator" element={<SipCalculator />} />
            <Route path="/Calculator/LumpsumCalculator" element={<LumpsumCalculator />} />
            <Route path="/Calculator/TimeCalculator" element={<TimeCalculator />} />
            <Route path="/Calculator/StepupCalculator" element={<StepupCalculator />} />
            <Route path="/Calculator/CagrCalculator" element={<CagrCalculator />} />
            <Route path="/Calculator/LumpsumCagrCalculator" element={<LumpsumCagrCalculator />} />
            <Route path="/Calculator/OneTimeInvestmentCalculator" element={<OneTimeInvestmentCalculator />} />
            <Route path="/Calculator/EmiCalculator" element={<EmiCalculator />} />
            <Route path="/Calculator/SwpCalculator" element={<SwpCalculator />} />
            <Route path="/FIRE" element={<FIRE />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Market" element={<Market />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/AskUs" element={<AskUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>  
  );
}

export default App;
