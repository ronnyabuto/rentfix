import { useNavigate } from "react-router-dom";

export default function About() {
  const nav = useNavigate();

  const team = [
    { name: "Kimberly", role: "Layouts & Pages" },
    { name: "Tamara", role: "UI Components & Styling" },
    { name: "Nyabuto", role: "Data & Logic" },
    { name: "Mugambi", role: "Routing & Navigation" },
  ];

  return (
    <div className="l-simple-page">
      <header className="t-simple-top">
        <div>
          <div className="t-simple-brand">Rentfix</div>
          <div className="t-simple-sub">About the Team</div>
        </div>

        <button className="t-simple-logout" onClick={() => nav("/")}>
          Back Home
        </button>
      </header>

      <main className="t-simple-main">
        <h2 className="t-simple-h2" style={{ marginBottom: 18 }}>Project Team</h2>

        <div className="t-simple-list">
          {team.map((member) => (
            <div key={member.name} className="t-simple-card">
              <div className="t-simple-title">{member.name}</div>
              <div className="t-simple-meta">{member.role}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 22, background: "#f9fafb", borderRadius: 8 }}>
          <div className="t-simple-title">Rentfix Application</div>
          <p className="t-simple-desc">
            A property management solution connecting tenants and landlords for efficient maintenance tracking.
          </p>
        </div>
      </main>
    </div>
  );
}
