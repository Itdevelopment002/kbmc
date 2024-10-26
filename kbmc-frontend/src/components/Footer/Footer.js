import React from 'react';
import './Footer.css';  // Assuming custom styles for padding/margin adjustments

const Footer = () => {
    return (
        <footer className="main-footer fixed-bottom" style={{zIndex:1}}>
            <div className="footer-bottom centred">
                <div className="auto-container">
                    <div className="bottom-inner">
                        <div className="copyright">
                            <p>
                                Copyright &copy; 2024 <a href="#.">KBMC</a>. All rights reserved. 
                                <span> | </span> 
                                <a href="/privacy-policy">Privacy Policy</a> 
                                <span> | </span> 
                                <a href="#.">Terms &amp; Conditions</a> 
                                <span> | </span> 
                                <a href="/contact">Contact Us</a> 
                                <span> | </span> 
                                Total Visitors: <a href="#.">135019</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
