import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinned, Building2, AlertTriangle, Shield, Clock, FileText, Siren, Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/AuthContext";
import { mockBuildings, getStageColor, Building } from "@/data/mockData";
import { getStateById, DistrictInfo } from "@/data/statesData";
import { sendDistrictAlert } from "@/services/alertService";
import IndiaMap from "@/components/IndiaMap";
import IncidentLog from "@/components/IncidentLog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const incidentTrend = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  incidents: Math.floor(Math.random() * 8),
}));

const DistrictDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState<DistrictInfo | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    if (user?.state && user?.district) {
      const state = getStateById(user.state);
      const d = state?.districts.find((dd) => dd.id === user.district);
      setDistrict(d || null);
    }
    setLoading(false);
  }, [user]);

  const handleDistrictAlert = async () => {
    const targetDistrict = district?.name || districtName;
    const alert = await sendDistrictAlert(targetDistrict, `District-wide advisory: Elevated risk levels detected in ${targetDistrict}.`);
    setAlertMessage("✓ Sent district wide alert to everyone");
    toast({
      title: "Alert Sent Successfully",
      description: `District-wide alert has been sent to all officers in ${targetDistrict}`,
    });
    // Clear the message after 5 seconds
    setTimeout(() => setAlertMessage(""), 5000);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  const districtName = district?.name || "Mumbai";
  const districtData = district || { name: "Mumbai", riskScore: 72, buildings: 820, activeAlerts: 18, stage: "Dangerous" as const };

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPinned size={24} className="text-role-district" /> {districtName} — District Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">District Emergency Operations — Local Monitoring</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* District Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: MapPinned, label: "District", value: districtName, color: "text-role-district" },
          { icon: Building2, label: "Buildings", value: districtData.buildings.toString(), color: "text-primary" },
          { icon: AlertTriangle, label: "Active Incidents", value: districtData.activeAlerts.toString(), color: "text-stage-alert" },
          { icon: Shield, label: "Risk Level", value: districtData.riskScore.toString(), color: getStageColor(districtData.stage) },
          { icon: Clock, label: "Stage", value: districtData.stage, color: getStageColor(districtData.stage) },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-sm card-hover">
            <s.icon size={18} className="mb-2" style={{ color: typeof s.color === "string" && s.color.startsWith("hsl") ? s.color : undefined }} />
            <p className="text-2xl font-mono font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* District Map + Local Controls */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">District Map — {districtName}</h3>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <IndiaMap center={[19.076, 72.877]} zoom={11} />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-foreground">Local Emergency Controls</h3>
          <div className="space-y-2">
            <div>
              <Button variant="outline" className="w-full justify-start text-stage-alert border-stage-alert/30 hover:bg-stage-alert/10" onClick={handleDistrictAlert}>
                <Siren size={14} className="mr-2" /> Send District-Wide Alert
              </Button>
              {alertMessage && (
                <div className="mt-3 p-4 bg-green-100 border-l-4 border-green-500 rounded-md shadow-md">
                  <p className="text-sm text-green-900 font-bold">✓ {alertMessage}</p>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Officers notified in " + districtName })}>
              <AlertTriangle size={14} className="mr-2" /> Notify Local Officers
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Evacuation advisory issued" })}>
              <Shield size={14} className="mr-2" /> Trigger Evacuation Advisory
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              const doc = new jsPDF();
              doc.setFontSize(18);
              doc.text(`IDIS District Report — ${districtName}`, 14, 22);
              doc.setFontSize(10);
              doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
              doc.line(14, 33, 196, 33);
              let y = 42;
              doc.setFontSize(12);
              doc.text("District Overview", 14, y); y += 8;
              doc.setFontSize(10);
              doc.text(`Risk Score: ${districtData.riskScore}`, 14, y); y += 6;
              doc.text(`Stage: ${districtData.stage}`, 14, y); y += 6;
              doc.text(`Total Buildings: ${districtData.buildings}`, 14, y); y += 6;
              doc.text(`Active Alerts: ${districtData.activeAlerts}`, 14, y); y += 12;
              doc.setFontSize(12);
              doc.text("Building Monitoring", 14, y); y += 8;
              doc.setFontSize(9);
              mockBuildings.forEach((b) => {
                if (y > 270) { doc.addPage(); y = 20; }
                doc.text(`${b.name} | Stage: ${b.stage} | Risk: ${b.riskScore} | Temp: ${b.sensors.temperature}°C | Gas: ${b.sensors.gasLevel}ppm | Vibration: ${b.sensors.vibration}g`, 14, y);
                y += 6;
              });
              doc.save(`IDIS_District_Report_${districtName.replace(/\s/g, "_")}.pdf`);
              toast({ title: "PDF Downloaded", description: `District report for ${districtName} saved.` });
            }}>
              <Download size={14} className="mr-2" /> Generate District Report
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Note: National broadcast and cross-state access restricted.</p>
        </div>
      </div>

      {/* Building Monitoring Table */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Building Monitoring</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 text-muted-foreground font-medium">Building</th>
                <th className="pb-2 text-muted-foreground font-medium">Status</th>
                <th className="pb-2 text-muted-foreground font-medium">Temp (°C)</th>
                <th className="pb-2 text-muted-foreground font-medium">Gas (ppm)</th>
                <th className="pb-2 text-muted-foreground font-medium">Vibration (g)</th>
                <th className="pb-2 text-muted-foreground font-medium">Last Activity</th>
                <th className="pb-2 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockBuildings.map((b) => (
                <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{b.name}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: getStageColor(b.stage), backgroundColor: `${getStageColor(b.stage)}15` }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: getStageColor(b.stage) }} />
                      {b.stage}
                    </span>
                  </td>
                  <td className="py-3 font-mono">{b.sensors.temperature}</td>
                  <td className="py-3 font-mono">{b.sensors.gasLevel}</td>
                  <td className="py-3 font-mono">{b.sensors.vibration}</td>
                  <td className="py-3 text-muted-foreground text-xs">{b.lastUpdated}</td>
                  <td className="py-3">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/building/${b.id}`)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* District Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Incident Trend (Last 24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={incidentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="incidents" stroke="hsl(var(--role-district))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Building Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockBuildings.map((b) => ({ name: b.name, risk: b.riskScore }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="risk" fill="hsl(var(--role-district))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Incident Log */}
      <section>
        <IncidentLog />
      </section>
    </div>
  );
};

export default DistrictDashboard;
