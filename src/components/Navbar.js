import "./Navbar.css";
import{ Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="Logo">SochSahi</h1>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/ContactUs">Support Us</Link>
        <Link to="/AskUs">Ask Us</Link>
        <Link to="/Calculator">Calculator</Link>
        <Link to="/FIRE">F.I.R.E</Link>
        <Link to="/Market">Market</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Sign Up</Link>
      </div>
    </nav>
  );
}
