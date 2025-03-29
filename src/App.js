import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // ✅ Import Navbar
import Homelook from './pages/Homelook';
import Calulator from './pages/Calculator';
import FIRE from './pages/FIRE';
import Login from './pages/Login';
import Market from './pages/Market';
import Signup from './pages/Signup';
import SupportUs from './pages/SupportUs';
import AskUs from './pages/AskUs';
import ContactUs from './pages/ContactUs';
import SipCalculator from './Sip';
import LumpsumCalculator from './Lumpsum';


function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          < Route path="/Home/Homelook" element={<Homelook />} />
          <Route path="/Calculator" element={<Calulator />} />
          <Route path="/Calculator/Sip" element={<SipCalculator />} />
          <Route path="/Calculator/Lumpsum" element={<LumpsumCalculator />} />
          <Route path="/FIRE" element={<FIRE />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Market" element={<Market />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/SupportUs" element={<SupportUs />} />
          <Route path="/AskUs" element={<AskUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes> 
    </>
  );
}

export default App;
