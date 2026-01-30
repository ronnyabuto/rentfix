'user client';
import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './NavbarHead.css';
import { useAppContext } from '../context/AppContext';
import { FaHome, FaUser, FaInfoCircle } from 'react-icons/fa';

export default function NavbarHead() {
  const nav = useNavigate();
  const { currentUser } = useAppContext();
    return (
    <nav className="navbar-head">
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => nav('/')}>
            <a className="navbar-logo-link" href='/'>Rentfix</a>
        </div>
      </div>
      <div className="navbar-right">
        <Link to='/' className="navbar-item">
          <FaHome /> Home
        </Link>
        <Link to='/about' className="navbar-item">
            <FaInfoCircle /> About
        </Link>
        <Link to='/login' className="navbar-item">
          Login
        </Link>
        <Link to='/register' className="navbar-item">
          Register
        </Link>

      </div>
    </nav>
  );
}