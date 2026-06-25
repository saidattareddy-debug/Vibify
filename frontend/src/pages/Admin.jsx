import { useEffect, useState } from "react";
import { getSubmissions, getStats } from "../lib/api";
import { Mail, Phone, MessageSquare, RefreshCw } from "lucide-react";

const tabs = [
  { key: "", label: "All" },
  { key: "contact", label: "Contact" },
  { key: "booking", label: "Bookings" },
  { key: "newsletter", label: "Newsletter" },
];

const typeMeta = {
  contact: { icon: MessageSquare, color: "text-violet" },
  booking: { icon: Phone, color: "text-magenta" },
  newsletter: { icon: Mail, color: "text-cyan" },
};

export default function Admin() {
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [subs, st] = await Promise.all([getSubmissions(type), getStats()]);
    setRows(subs);
    setStats(st);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [type]);

  return (
    <div className="min-h-screen bg-ink text-textPrimary" data-testid="admin-page">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-semibold">Vibify <span className="text-gradient">Inbox</span></h1>
          <button onClick={load} data-testid="admin-refresh" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {stats && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total", v: stats.total },
              { label: "Contact", v: stats.contact },
              { label: "Bookings", v: stats.booking },
              { label: "Newsletter", v: stats.newsletter },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-surface/60 p-5">
                <div className="font-display text-3xl text-gradient">{s.v}</div>
                <div className="text-sm text-textMuted">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              data-testid={`admin-tab-${t.label.toLowerCase()}`}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${type === t.key ? "bg-vibe-gradient text-white" : "border border-white/10 text-textMuted hover:bg-white/5"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3" data-testid="admin-list">
          {!loading && rows.length === 0 && <p className="text-textMuted">No submissions yet.</p>}
          {rows.map((r) => {
            const meta = typeMeta[r.type] || typeMeta.contact;
            const Icon = meta.icon;
            return (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-surface/40 p-5" data-testid="admin-row">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${meta.color}`} />
                    <div>
                      <p className="font-medium">{r.name || r.email}</p>
                      <p className="text-sm text-textMuted">{r.email}{r.company ? ` · ${r.company}` : ""}</p>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-textMuted">{r.type}</span>
                </div>
                {(r.message || r.goal) && (
                  <p className="mt-3 text-textMuted">{r.message || r.goal}</p>
                )}
                <p className="mt-2 text-xs text-textMuted/60">{new Date(r.created_at).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
