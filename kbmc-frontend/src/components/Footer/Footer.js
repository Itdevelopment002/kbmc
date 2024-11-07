import React from 'react';
import './Footer.css'; 
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="main-footer fixed-bottom" style={{zIndex:1}}>
            <div className="footer-bottom centred">
                <div className="auto-container">
                    <div className="bottom-inner">
                        <div className="copyright">
                            <p>
                                Copyright &copy; 2024 <Link to="#.">KBMC</Link>. All rights reserved. 
                                <span> | </span> 
                                <Link to="/privacy-policy">Privacy Policy</Link> 
                                <span> | </span> 
                                <Link to="#.">Terms &amp; Conditions</Link> 
                                <span> | </span> 
                                <Link to="/contact">Contact Us</Link> 
                                <span> | </span> 
                                Total Visitors: <Link to="#.">135019</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
