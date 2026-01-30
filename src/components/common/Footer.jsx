'user client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
export default function Footer() {
  const nav = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
            <span className="footer-brand" onClick={() => nav('/')}>Rentfix</span>
            <span className="footer-link" onClick={() => nav('/about')}>About</span>
            <span className="footer-link" onClick={() => nav('/contact')}>Contact</span>
            <span className="footer-link" onClick={() => nav('/privacy')}>Privacy Policy</span>
        </div>
        <div className="footer-right">
          &copy; {new Date().getFullYear()} Rentfix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}