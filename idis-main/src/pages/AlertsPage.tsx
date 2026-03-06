import { AlertTriangle, Clock, MapPin } from "lucide-react";

const alerts = [
  { id: 1, building: "Building D", state: "Delhi", type: "Temperature Spike", severity: "Critical" as const, time: "2 min ago", detail: "Temperature exceeded 62°C" },
  { id: 2, building: "Building A", state: "Maharashtra", type: "Gas Alert", severity: "Dangerous" as const, time: "5 min ago", detail: "Gas level at 320 ppm" },
  { id: 3, building: "Building F", state: "Gujarat", type: "Motion Detected", severity: "Alert" as const, time: "12 min ago", detail: "Unauthorized motion in restricted zone" },
  { id: 4, building: "Building D", state: "Delhi", type: "Vibration Anomaly", severity: "Critical" as const, time: "15 min ago", detail: "Vibration sensor recorded 1.4g" },
  { id: 5, building: "Building B", state: "Karnataka", type: "Gas Warning", severity: "Alert" as const, time: "30 min ago", detail: "Gas level approaching threshold" },
  { id: 6, building: "Building A", state: "Maharashtra", type: "Evacuation Triggered", severity: "Dangerous" as const, time: "45 min ago", detail: "Auto-evacuation protocol initiated" },
];

const sevStyles: Record<string, string> = {
  Critical: "border-stage-critical/30 bg-stage-critical/5 text-stage-critical",
  Dangerous: "border-stage-danger/30 bg-stage-danger/5 text-stage-danger",
  Alert: "border-stage-alert/30 bg-stage-alert/5 text-stage-alert",
};

const AlertsPage = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <AlertTriangle className="text-stage-critical" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Active Alerts</h1>
          <p className="text-sm text-muted-foreground">Real-time alert feed across all monitored buildings</p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className={`rounded-lg border p-4 shadow-sm card-hover ${sevStyles[a.severity]}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider">{a.severity}</span>
                <span className="font-medium text-foreground">{a.type}</span>
              </div>
              <span className="text-xs font-mono flex items-center gap-1 text-muted-foreground">
                <Clock size={10} /> {a.time}
              </span>
            </div>
            <p className="text-sm text-foreground/80">{a.detail}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin size={10} /> {a.building} — {a.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
