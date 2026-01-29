import { useNavigate } from "react-router-dom";
import { useMaintenanceReports } from "../../hooks/useMaintenanceReports";
import { useAppContext } from "../../context/AppContext";

export default function TenantDashboardPage() {
  const nav = useNavigate();
  const { reports, loading } = useMaintenanceReports();
  const { switchUser, users } = useAppContext();

  const logout = () => {
    // optional: switch to landlord or just go home
    // switchUser(users[0].id);
    nav("/");
  };

  return (
    <div className="t-simple-page">
      <header className="t-simple-top">
        <div>
          <div className="t-simple-brand">Rentfix</div>
          <div className="t-simple-sub">Tenant Dashboard</div>
        </div>

        <button className="t-simple-logout" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="t-simple-main">
        <div className="t-simple-headrow">
          <h2 className="t-simple-h2">Your Issues</h2>

          <button
            className="t-simple-btn"
            onClick={() => nav("/tenant/report")}
          >
            Report Issue
          </button>
        </div>

        {loading ? (
          <div className="t-simple-muted">Loading issues...</div>
        ) : reports.length === 0 ? (
          <div className="t-simple-muted">No issues yet. Create one.</div>
        ) : (
          <div className="t-simple-list">
            {reports.map((issue) => (
              <div key={issue.id} className="t-simple-card">
                <div className="t-simple-card-top">
                  <div>
                    <div className="t-simple-title">{issue.title}</div>
                    <div className="t-simple-meta">{formatRelative(issue.createdAt)}</div>
                  </div>

                  <div className="t-simple-status">{issue.status}</div>
                </div>

                <div className="t-simple-desc">{issue.description}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function formatRelative(iso) {
  // Day display
  try {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const days = Math.max(0, Math.floor((now - then) / (1000 * 60 * 60 * 24)));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  } catch {
    return "";
  }
}
