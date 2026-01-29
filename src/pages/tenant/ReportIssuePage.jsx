import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaintenanceReports } from "../../hooks/useMaintenanceReports";
import { CATEGORY, PRIORITY } from "../../utils/constants";

export default function ReportIssuePage() {
  const nav = useNavigate();
  const { createReport, reports, loading } = useMaintenanceReports();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]); // FileList

  // optional fields (safe defaults)
  const [category, setCategory] = useState(CATEGORY.PLUMBING);
  const [priority, setPriority] = useState(PRIORITY.MEDIUM);

  const canSubmit = title.trim() && description.trim();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // ✅ Create preview URLs so images can render
    const photos = Array.from(files || []).map((f) => URL.createObjectURL(f));

    createReport({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      photos,
    });

    nav("/tenant/dashboard");
  };

  return (
    <div className="t-simple-page">
      <header className="t-simple-top">
        <div>
          <div className="t-simple-brand">Rentfix</div>
          <div className="t-simple-sub">Tenant Dashboard</div>
        </div>

        <button className="t-simple-logout" onClick={() => nav("/")}>
          Logout
        </button>
      </header>

      <main className="t-simple-main">
        <div className="t-simple-headrow">
          <h2 className="t-simple-h2">Report an Issue</h2>
        </div>

        {/* FORM CARD */}
        <div className="t-form-card">
          <form onSubmit={onSubmit}>
            <div className="t-form-field">
              <label className="t-form-label">Issue Title</label>
              <input
                className="t-form-input"
                placeholder="e.g., Broken window in bedroom"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="t-form-field">
              <label className="t-form-label">Description</label>
              <textarea
                className="t-form-input t-form-textarea"
                placeholder="Describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Optional dropdowns */}
            <div className="t-form-grid">
              <div className="t-form-field">
                <label className="t-form-label">Category</label>
                <select
                  className="t-form-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {Object.values(CATEGORY).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="t-form-field">
                <label className="t-form-label">Priority</label>
                <select
                  className="t-form-input"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  {Object.values(PRIORITY).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="t-form-field">
              <label className="t-form-label">Photos</label>
              <input
                className="t-form-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>

            {/* ✅ Preview selected images BEFORE submit */}
            {files && files.length > 0 && (
              <div className="t-form-photos">
                <div className="t-form-photos-label">Selected Photos:</div>
                <div className="issue-photos">
                  {Array.from(files).map((f, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(f)}
                      alt={`Selected ${i + 1}`}
                      className="issue-photo"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="t-form-actions">
              <button className="t-simple-btn" disabled={!canSubmit}>
                Submit Issue
              </button>

              <button
                type="button"
                className="t-form-cancel"
                onClick={() => nav("/tenant/dashboard")}
              >
                Cancel
              </button>
            </div>

            {!canSubmit && (
              <div className="t-form-hint">Title and description are required.</div>
            )}
          </form>
        </div>

        {/* LIST BELOW */}
        <div className="t-form-listwrap">
          {loading ? (
            <div className="t-simple-muted">Loading issues...</div>
          ) : reports.length === 0 ? (
            <div className="t-simple-muted">No issues yet.</div>
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

                  {/* ✅ Render stored photo URLs as images */}
                  {issue.photos?.length > 0 && (
                    <div className="t-form-photos">
                      <div className="t-form-photos-label">Photos:</div>
                      <div className="issue-photos">
                        {issue.photos.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Issue ${idx + 1}`}
                            className="issue-photo"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
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
