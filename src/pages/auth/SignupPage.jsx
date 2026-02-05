import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { properties, signupTenantWithHouseVerification, currentUser, loading } =
    useAppContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
    propertyId: "",
    houseNumber: "",
  });
  const [error, setError] = useState("");

  // If already logged in, send to dashboard
  useMemo(() => {
    if (!currentUser) return;
    navigate(currentUser.role === "landlord" ? "/landlord" : "/tenant", {
      replace: true,
    });
  }, [currentUser, navigate]);

  const onChange = (e) => {
    setError("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = signupTenantWithHouseVerification({
      email: form.email,
      password: form.password,
      propertyId: form.propertyId,
      houseNumber: form.houseNumber,
    });

    if (!res.ok) {
      setError(res.message || "Signup failed.");
      return;
    }

    navigate(res.redirectTo, { replace: true });
  };

  const hasApartments = (properties || []).length > 0;

  return (
    <div className="auth-page" style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Tenant Signup</h1>
        <p style={styles.subtitle}>
          Choose your apartment, enter your house number, and create an account.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        {loading ? (
          <div style={{ padding: 12, opacity: 0.7 }}>Loading...</div>
        ) : !hasApartments ? (
          <div style={styles.warning}>
            No apartments available yet. Ask your landlord to add apartments and
            house numbers first.
          </div>
        ) : (
          <form onSubmit={onSubmit} style={styles.form}>
            <label style={styles.label}>
              Apartment
              <select
                name="propertyId"
                value={form.propertyId}
                onChange={onChange}
                style={styles.input}
                required
              >
                <option value="">Select apartment...</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              House Number
              <input
                name="houseNumber"
                value={form.houseNumber}
                onChange={onChange}
                placeholder="e.g. A3"
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                style={styles.input}
                required
              />
            </label>

            <button type="submit" style={styles.button}>
              Create Tenant Account
            </button>
          </form>
        )}

        <div style={styles.footer}>
          <span>Already have an account?</span>{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </div>

        <div style={styles.footer}>
          <Link to="/" style={styles.linkMuted}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 60px)",
    display: "grid",
    placeItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 20,
    background: "#fff",
    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  },
  title: { margin: 0, fontSize: 24, fontWeight: 800 },
  subtitle: { marginTop: 8, marginBottom: 16, opacity: 0.75 },
  error: {
    marginBottom: 12,
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(220, 38, 38, 0.08)",
    color: "#b91c1c",
    border: "1px solid rgba(220, 38, 38, 0.25)",
  },
  warning: {
    marginBottom: 12,
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(245, 158, 11, 0.12)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    color: "rgba(0,0,0,0.8)",
  },
  form: { display: "grid", gap: 12 },
  label: { display: "grid", gap: 6, fontWeight: 600, fontSize: 14 },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    outline: "none",
    fontSize: 14,
    background: "white",
  },
  button: {
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    background: "#16a34a",
    color: "white",
  },
  footer: { marginTop: 14, fontSize: 14, opacity: 0.9 },
  link: { color: "#16a34a", fontWeight: 700, textDecoration: "none" },
  linkMuted: { color: "rgba(0,0,0,0.65)", textDecoration: "none" },
};
