import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <p>Copyright © 2025 Nitidhan - All Rights Reserved, Built with <span className="heart">♥</span> in India</p>
                </div>
                <ul className="footer-links">
                    <li className="footer-item">
                        <Link to="/" className="footer-link" onClick={scrollToTop}>Home</Link>
                    </li>
                    <li className="footer-item">
                        <Link to="/Calculator" className="footer-link" onClick={scrollToTop}>Calculators</Link>
                    </li>
                    <li className="footer-item">
                        <Link to="/AskUs" className="footer-link" onClick={scrollToTop}>Ask Us</Link>
                    </li>
                    <li className="footer-item">
                        <Link to="/ContactUs" className="footer-link" onClick={scrollToTop}>Contact Us</Link>
                    </li>
                    <li className="footer-item">
                        <Link to="/about" className="footer-link" onClick={scrollToTop}>About</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
