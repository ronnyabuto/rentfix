import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaintenanceReports } from "../../hooks/useMaintenanceReports";
import { useAppContext } from "../../context/AppContext";
import { STATUS } from "../../utils/constants";

export default function LandlordDashboardPage() {
  const nav = useNavigate();
  const { reports, loading, updateStatus, canEdit } = useMaintenanceReports();
  const { users } = useAppContext();

  const [activeTab, setActiveTab] = useState("all");

  const counts = useMemo(() => {
    const pending = reports.filter((r) => r.status === STATUS.PENDING).length;
    const inProgress = reports.filter((r) => r.status === STATUS.IN_PROGRESS).length;
    const fixed = reports.filter((r) => r.status === STATUS.COMPLETED).length;

    return {
      all: reports.length,
      pending,
      inProgress,
      fixed,
    };
  }, [reports]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return reports;
    if (activeTab === "pending") return reports.filter((r) => r.status === STATUS.PENDING);
    if (activeTab === "inProgress") return reports.filter((r) => r.status === STATUS.IN_PROGRESS);
    if (activeTab === "fixed") return reports.filter((r) => r.status === STATUS.COMPLETED);
    return reports;
  }, [reports, activeTab]);

  return (
    <div className="l-simple-page">
      <header className="t-simple-top">
        <div>
          <div className="t-simple-brand">Rentfix</div>
          <div className="t-simple-sub">Landlord Dashboard</div>
        </div>

        <button className="t-simple-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="t-simple-main">
        <h2 className="t-simple-h2" style={{ marginBottom: 14 }}>
          Maintenance Requests
        </h2>

        <div className="l-tabs">
          <button
            className={`l-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All ({counts.all})
          </button>

          <button
            className={`l-tab ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending ({counts.pending})
          </button>

          <button
            className={`l-tab ${activeTab === "inProgress" ? "active" : ""}`}
            onClick={() => setActiveTab("inProgress")}
          >
            In Progress ({counts.inProgress})
          </button>

          <button
            className={`l-tab ${activeTab === "fixed" ? "active" : ""}`}
            onClick={() => setActiveTab("fixed")}
          >
            Fixed ({counts.fixed})
          </button>
        </div>

        {loading ? (
          <div className="t-simple-muted">Loading requests...</div>
        ) : filtered.length === 0 ? (
          <div className="t-simple-muted">No requests in this tab.</div>
        ) : (
          <div className="t-simple-list">
            {filtered.map((issue) => {
              const tenant = users.find((u) => u.id === issue.tenantId);
              const apt = tenant?.propertyId ? formatApt(tenant.propertyId) : "";

              return (
                <div key={issue.id} className="t-simple-card">
                  <div className="t-simple-card-top">
                    <div>
                      <div className="t-simple-title">{issue.title}</div>
                      <div className="t-simple-meta">
                        {formatRelative(issue.createdAt)}
                        {apt ? `  •  ${apt}` : ""}
                      </div>
                    </div>

                    <div className="t-simple-status">{issue.status}</div>
                  </div>

                  <div className="t-simple-desc">{issue.description}</div>

                  <div className="l-divider" />

                  <div className="l-update-row">
                    <div className="l-update-label">Update status:</div>

                    <select
                      className="l-select"
                      value={issue.status}
                      disabled={!canEdit}
                      onChange={(e) => updateStatus(issue.id, e.target.value)}
                    >
                      <option value={STATUS.PENDING}>{STATUS.PENDING}</option>
                      <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
                      <option value={STATUS.SCHEDULED}>{STATUS.SCHEDULED}</option>
                      <option value={STATUS.COMPLETED}>{STATUS.COMPLETED}</option>
                      <option value={STATUS.CANCELLED}>{STATUS.CANCELLED}</option>
                    </select>
                  </div>
                </div>
              );
            })}
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

function formatApt(propertyId) {
  const map = { p1: "Apt 201", p2: "Apt 304", p3: "Apt 102", p4: "Apt 410" };
  return map[propertyId] || "Apt";
}
