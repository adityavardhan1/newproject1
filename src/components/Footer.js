import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h2>NitiDhan</h2>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Calculator">Calculators</a></li>
                        <li><a href="/Market">Ask Us</a></li>
                        <li><a href="/FIRE">Contact Us</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
