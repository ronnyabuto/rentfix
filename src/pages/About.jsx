import { Link } from "react-router-dom";
import { FaUsers, FaArrowLeft, FaCheck, FaRocket, FaHandshake, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">
      {/* Navigation (Simple) */}
      <nav className="about-nav">
        <Link to="/" className="about-back-btn">
          <FaArrowLeft /> Back to Home
        </Link>
      </nav>

      <div className="about-hero-wrapper">
        <div className="about-hero-content">
          <div className="about-badge">The Story</div>
          <h1 className="about-hero-title">Reimagining Property <br /><span className="text-highlight">Communication.</span></h1>
          <p className="about-hero-sub">
            We are building the future of tenant-landlord relationships.
            No more lost emails, ignored calls, or delayed repairs.
          </p>
        </div>
      </div>

      <div className="about-content-wrapper">
        {/* Mission Grid */}
        {/* Mission Section */}
        <div className="mission-container">
          <div className="mission-card main full-width">
            <h3>Our Mission</h3>
            <p>
              Rentfix was started by users who were tired of endless emails and phone tag.
              We realized there had to be a better way to report leaking faucets or broken heaters.
            </p>
          </div>
        </div>

        {/* Why Trust Rentfix Section */}
        <div className="trust-section">
          <h2>Why Trust Rentfix?</h2>
          <div className="trust-grid">
            <div className="mission-card">
              <div className="icon-box-soft blue"><FaRocket /></div>
              <h4>Speed</h4>
              <p>Report issues in seconds.</p>
            </div>
            <div className="mission-card">
              <div className="icon-box-soft green"><FaHandshake /></div>
              <h4>Trust</h4>
              <p>Transparent updates for all.</p>
            </div>
            <div className="mission-card">
              <div className="icon-box-soft purple"><FaLightbulb /></div>
              <h4>Clarity</h4>
              <p>Know exactly what's happening.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Meet the Team</h2>
          <p className="team-sub">The minds behind the platform.</p>

          <div className="team-grid">
            {['Kimberly Ayiaki', 'Ronny Nyabuto', 'Tamara Chebet', 'Maingi Mugambi'].map((name, i) => (
              <div className="team-card-modern" key={i}>
                <div className="team-avatar-modern">
                  <span className="initials">{name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3>{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
