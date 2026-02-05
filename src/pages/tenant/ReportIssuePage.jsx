import { useNavigate } from "react-router-dom";
import { useMaintenanceReports } from "../../hooks/useMaintenanceReports";
import IssueForm from "../../components/forms/IssueForm";

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const { reports, loading } = useMaintenanceReports();

  return (
    <div className="t-simple-page">
      <header className="t-simple-top">
        <div>
          <div className="t-simple-brand">Rentfix</div>
          <div className="t-simple-sub">Tenant Dashboard</div>
        </div>

        <button className="t-simple-logout" onClick={() => navigate("/")}>
          Logout
        </button>
      </header>

      <main className="t-simple-main">
        <div className="t-simple-headrow">
          <h2 className="t-simple-h2">Report Maintenance Issue</h2>
        </div>

        <div style={{ marginBottom: 40 }}>
          <IssueForm />
        </div>

        <div className="t-simple-headrow" style={{ marginTop: 40 }}>
          <h2 className="t-simple-h2">History</h2>
        </div>

        {loading ? (
          <div className="t-simple-muted">Loading history...</div>
        ) : reports.length === 0 ? (
          <div className="t-simple-muted">No history found.</div>
        ) : (
          <div className="t-simple-list">
            {reports.slice(0, 3).map((issue) => (
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
