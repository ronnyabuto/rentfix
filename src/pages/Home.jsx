import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const navigate = useNavigate();
  const { login, signup } = useAppContext();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tenant"); // Only for signup
  const [name, setName] = useState(""); // Only for signup
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const user = login(email);
        if (user.role === 'landlord') navigate("/landlord/dashboard");
        else navigate("/tenant/dashboard");
      } else {
        const user = signup(email, role, name);
        if (user.role === 'landlord') navigate("/landlord/dashboard");
        else navigate("/tenant/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home-wrap">
      <div className="home-card">
        <h1 className="home-title">Rentfix</h1>
        <p className="home-sub" style={{ marginBottom: 20 }}>
          {isLogin ? "Login to your account" : "Create a new account"}
        </p>

        <form onSubmit={handleSubmit} className="home-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="t-simple-input"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="t-simple-input"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="t-simple-input"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />

          {error && <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{error}</p>}

          <button type="submit" className="home-btn" style={{ marginTop: '8px' }}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '14px' }}
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>

        <div className="home-hint" style={{ marginTop: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/about')}>
          About Rentfix
        </div>
      </div>
    </div>
  );
}
