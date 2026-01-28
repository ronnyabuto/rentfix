import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const nav = useNavigate();
  const { users, switchUser, currentUser } = useAppContext();

  const tenant = useMemo(() => users.find((u) => u.role === "tenant"), [users]);
  const landlord = useMemo(() => users.find((u) => u.role === "landlord"), [users]);

  const [selected, setSelected] = useState("tenant");

  const continueNow = () => {
    if (selected === "tenant" && tenant) {
      switchUser(tenant.id);
      nav("/tenant/dashboard");
      return;
    }
    if (selected === "landlord" && landlord) {
      switchUser(landlord.id);
      nav("/landlord/dashboard");
    }
  };

  return (
    <div className="home-wrap">
      <div className="home-card">
        <h1 className="home-title">Rentfix</h1>
        <p className="home-sub">Maintenance request management</p>

        <div
          className={`home-role ${selected === "tenant" ? "active" : ""}`}
          onClick={() => setSelected("tenant")}
          role="button"
          tabIndex={0}
        >
          <div className="home-role-title">Tenant ({tenant?.fullName})</div>
          <div className="home-role-sub">Report and track issues</div>
        </div>

        <div
          className={`home-role ${selected === "landlord" ? "active" : ""}`}
          onClick={() => setSelected("landlord")}
          role="button"
          tabIndex={0}
        >
          <div className="home-role-title">Landlord ({landlord?.fullName})</div>
          <div className="home-role-sub">Manage repair requests</div>
        </div>

        <button className="home-btn" onClick={continueNow}>
          Continue as {selected}
        </button>

      </div>
    </div>
  );
}
