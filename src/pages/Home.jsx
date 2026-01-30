'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Home.css';
import { useAppContext } from '../context/AppContext';
import { FaInfoCircle } from 'react-icons/fa';
import './Home.css';




export default function Home() {
  const nav = useNavigate();
  const { users, switchUser } = useAppContext();
    const tenant = users.find((u) => u.role === 'tenant');
    const landlord = users.find((u) => u.role === 'landlord');

  const [selected, setSelected] = React.useState('tenant');
    const continueNow = () => {
    if (selected === 'tenant' && tenant) {
      switchUser(tenant.id);
      nav('/tenant/dashboard');
      return;
    }
    if (selected === 'landlord' && landlord) {
      switchUser(landlord.id);
      nav('/landlord/dashboard');
      return;
    }
    };
    return (
    <div className="home-page">
           <div className="home-wrap">
        <div className="home-card">
          <h1 className="home-title">Rentfix</h1>

          <div className="hero-image">
            <img src="../assets/hero-mage.jpeg" alt="Hero" />
          </div>
          <p className="home-sub">Intelligent Property Management Solution</p>
        </div>
      </div>

          
    </div>
  );
}
