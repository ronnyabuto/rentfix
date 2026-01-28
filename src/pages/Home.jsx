import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaBuilding, FaTools, FaCheckCircle, FaUserShield } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <div className="landing-nav-wrapper">
        <nav className="landing-nav">
          <div className="landing-logo">
            <FaBuilding className="landing-logo-icon" />
            <span>Rentfix</span>
          </div>
          <div className="landing-links">
            <Link to="/about" className="landing-btn-small">About Us</Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">
            <FaUserShield className="badge-icon" /> Trusted by 500+ Properties
          </div>
          <h1 className="landing-title">
            Property Maintenance <br />
            <span className="text-highlight">Automated.</span>
          </h1>
          <p className="landing-subtitle">
            Bridge the gap between tenants and landlords. Report issues instantly,
            track repair status, and keep your property in perfect condition.
          </p>
          <div className="landing-cta-group">
            <button onClick={() => navigate('/start')} className="landing-btn-primary">
              Get Started <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="hero-circle"></div>
          <div className="visual-card main-card">
            <div className="vc-header">
              <div className="vc-dot red"></div>
              <div className="vc-dot yellow"></div>
              <div className="vc-dot green"></div>
            </div>
            <div className="vc-body">
              <div className="vc-row">
                <div className="vc-icon-box blue"><FaTools /></div>
                <div className="vc-text">
                  <div className="vc-line lg"></div>
                  <div className="vc-line sm"></div>
                </div>
              </div>
              <div className="vc-row">
                <div className="vc-icon-box green"><FaCheckCircle /></div>
                <div className="vc-text">
                  <div className="vc-line lg"></div>
                  <div className="vc-line sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="visual-float-card float-1">
            <span>⚡ Fast Repairs</span>
          </div>
          <div className="visual-float-card float-2">
            <span>🏠 Happy Tenants</span>
          </div>
        </div>
      </header>

      <svg className="landing-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
}
