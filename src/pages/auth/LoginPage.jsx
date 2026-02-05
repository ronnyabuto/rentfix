import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, currentUser } = useAppContext();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // If already logged in, send to correct dashboard
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

    const res = login({
      email: form.email,
      password: form.password,
    });

    if (!res.ok) {
      setError(res.message || "Login failed.");
      return;
    }

    navigate(res.redirectTo, { replace: true });
  };

  return (
    <div className="auth-page" style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>RentFix Login</h1>
        <p style={styles.subtitle}>
          Sign in as a Tenant or Landlord to continue.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={onSubmit} style={styles.form}>
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
            Sign In
          </button>
        </form>

        <div style={styles.footer}>
          <span>New here?</span>{" "}
          <Link to="/signup" style={styles.link}>
            Create a tenant account
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
    maxWidth: 460,
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
  form: { display: "grid", gap: 12 },
  label: { display: "grid", gap: 6, fontWeight: 600, fontSize: 14 },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    outline: "none",
    fontSize: 14,
  },
  button: {
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    background: "#16a34a", // green
    color: "white",
  },
  footer: { marginTop: 14, fontSize: 14, opacity: 0.9 },
  link: { color: "#16a34a", fontWeight: 700, textDecoration: "none" },
  linkMuted: { color: "rgba(0,0,0,0.65)", textDecoration: "none" },
};
