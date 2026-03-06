import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, AlertTriangle, Shield, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StateInfo, getStateById, statesData } from "@/data/statesData";
import { getStageColor, mockBuildings } from "@/data/mockData";
import BuildingCard from "@/components/BuildingCard";
import IndiaMap from "@/components/IndiaMap";

const StateCommand = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<StateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stateId) {
      const data = getStateById(stateId);
      setState(data || null);
    }
    setLoading(false);
  }, [stateId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  if (!state) {
    return (
      <div className="p-8">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to National View
        </Button>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">State not found</h2>
          <p className="text-muted-foreground mb-6">Available states:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {statesData.map((s) => (
              <Button
                key={s.id}
                variant="outline"
                onClick={() => navigate(`/dashboard/states/${s.id}`)}
                className="justify-start"
              >
                {s.name} ({s.id})
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{state.name} — State Command</h1>
          <p className="text-sm text-muted-foreground">State Emergency Control Room</p>
        </div>
      </div>

      {/* State Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Shield, label: "Risk Score", value: state.riskScore, color: getStageColor(state.stage) },
          { icon: Building2, label: "Buildings", value: state.buildings.toLocaleString(), color: "hsl(var(--primary))" },
          { icon: AlertTriangle, label: "Active Alerts", value: state.activeAlerts, color: "hsl(var(--stage-alert))" },
          { icon: AlertTriangle, label: "Critical", value: state.criticalBuildings, color: "hsl(var(--stage-critical))" },
          { icon: Clock, label: "Stage", value: state.stage, color: getStageColor(state.stage) },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-sm card-hover">
            <s.icon size={18} className="mb-2" style={{ color: s.color }} />
            <p className="text-2xl font-mono font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* State Map */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">State Map — {state.name}</h3>
        <div className="h-[300px] rounded-lg overflow-hidden">
          <IndiaMap center={[20.5, 78.9]} zoom={6} />
        </div>
      </div>

      {/* Districts */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">District Breakdown</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.districts.map((d) => (
            <div key={d.id} className="rounded-lg border border-border bg-card p-5 shadow-sm card-hover">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-foreground">{d.name}</h4>
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: getStageColor(d.stage) }} />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk</span>
                  <span className="font-mono font-bold" style={{ color: getStageColor(d.stage) }}>{d.riskScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Buildings</span>
                  <span className="text-foreground">{d.buildings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Alerts</span>
                  <span className="text-foreground">{d.activeAlerts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Building Incidents */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">Active Building Incidents</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBuildings.filter((b) => b.stage !== "Normal").map((b) => (
            <BuildingCard key={b.id} building={b} />
          ))}
        </div>
      </section>

      {/* Resource Deployment */}
      <section>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Resource Deployment</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-muted-foreground">Fire Units</span><p className="text-xl font-mono font-bold text-stage-danger">12</p></div>
            <div><span className="text-muted-foreground">Rescue Teams</span><p className="text-xl font-mono font-bold text-primary">8</p></div>
            <div><span className="text-muted-foreground">Medical Units</span><p className="text-xl font-mono font-bold text-stage-safe">15</p></div>
            <div><span className="text-muted-foreground">Police Units</span><p className="text-xl font-mono font-bold text-stage-alert">20</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StateCommand;
