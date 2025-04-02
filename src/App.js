import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homelook from './pages/Homelook';
import Calculator from './pages/Calculator';
import FIRE from './pages/FIRE';
import Login from './pages/Login';
import Market from './pages/Market';
import Signup from './pages/Signup';
import SupportUs from './pages/SupportUs';
import AskUs from './pages/AskUs';
import ContactUs from './pages/ContactUs';
import SipCalculator from './components/SipCalculator';
import LumpsumCalculator from './components/LumpsumCalculator';
import TimeCalculator from './components/TimeCalculator';
import StepupTimeCalculator from './components/StepupTimeCalculator';
import CagrCalculator from './components/CagrCalculator';
import LumpsumCagrCalculator from './components/LumpsumCagrCalculator';
import OneTimeInvestmentCalculator from './components/OneTimeInvestmentCalculator';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homelook />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/Calculator/SipCalculator" element={<SipCalculator />} />
        <Route path="/Calculator/LumpsumCalculator" element={<LumpsumCalculator />} />
        <Route path="/Calculator/TimeCalculator" element={<TimeCalculator />} />
        <Route path="/Calculator/StepupTimeCalculator" element={<StepupTimeCalculator />} />
        <Route path="/Calculator/CagrCalculator" element={<CagrCalculator />} />
        <Route path="/Calculator/LumpsumCagrCalculator" element={<LumpsumCagrCalculator />} />
        <Route path="/Calculator/OneTimeInvestmentCalculator" element={<OneTimeInvestmentCalculator />} />
        <Route path="/FIRE" element={<FIRE />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/SupportUs" element={<SupportUs />} />
        <Route path="/AskUs" element={<AskUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
