import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wifi, Clock, Loader2 } from "lucide-react";
import { Building, fetchBuildingData, getStageColor } from "@/data/mockData";
import SensorCard from "@/components/SensorCard";
import ChartsSection from "@/components/ChartsSection";
import SimulationControls from "@/components/SimulationControls";
import RiskGauge from "@/components/RiskGauge";
import EvacuationModule from "@/components/EvacuationModule";
import IncidentLog from "@/components/IncidentLog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { sendEmailAlert } from "@/services/alertService";

function getSensorStatus(value: number, thresholds: [number, number, number]): Building["stage"] {
  if (value >= thresholds[2]) return "Critical";
  if (value >= thresholds[1]) return "Dangerous";
  if (value >= thresholds[0]) return "Alert";
  return "Normal";
}

const BuildingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [building, setBuilding] = useState<Building | null>(null);
  const [sensors, setSensors] = useState<Building["sensors"] | null>(null);
  const [stage, setStage] = useState<Building["stage"]>("Normal");
  const [riskScore, setRiskScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const alertedStageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBuildingData(id).then((data) => {
      if (data) {
        setBuilding(data);
        setSensors(data.sensors);
        setStage(data.stage);
        setRiskScore(data.riskScore);
      }
      setLoading(false);
    });
  }, [id]);

  // Automated Alert Hook: Triggers when the building reaches Critical or Dangerous stages.
  useEffect(() => {
    if (!building) return;
    
    // Only send if we haven't already sent an alert for this stage
    if ((stage === "Dangerous" || stage === "Critical") && alertedStageRef.current !== stage) {
      alertedStageRef.current = stage;
      
      const message = `Automated Alert: Building ${building.name} stage escalated to ${stage}. Sensor Readings - Temp: ${sensors?.temperature}°C, Gas: ${sensors?.gasLevel}ppm, Vibration: ${sensors?.vibration}g`;
      
      sendEmailAlert("All Officers", message)
        .then(() => {
          toast({
            title: `Automated ${stage} Alert Sent`,
            description: "An email has been dispatched to all officers.",
            variant: "destructive"
          });
        })
        .catch((err) => {
          console.error("Automated alert failed", err);
        });
    }
    
    if (stage === "Normal") {
      alertedStageRef.current = null; // Reset when returning to normal
    }
  }, [stage, building, sensors]);

  const simulateFire = useCallback(() => {
    if (!sensors) return;
    setSensors({ ...sensors, temperature: 85, gasLevel: 750 });
    setStage("Dangerous");
    setRiskScore(95);
  }, [sensors]);

  const simulateEarthquake = useCallback(() => {
    if (!sensors) return;
    setSensors({ ...sensors, vibration: 2.8 });
    setStage("Critical");
    setRiskScore(90);
  }, [sensors]);

  const simulateGasExplosion = useCallback(() => {
    if (!sensors) return;
    setSensors({ ...sensors, gasLevel: 900, temperature: 72 });
    setStage("Critical");
    setRiskScore(98);
  }, [sensors]);

  const resetSystem = useCallback(() => {
    if (!building) return;
    setSensors(building.sensors);
    setStage(building.stage);
    setRiskScore(building.riskScore);
    toast({ title: "System Reset", description: "All values restored to baseline." });
  }, [building]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!building || !sensors) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Building not found.</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{building.name}</h1>
          <p className="text-sm text-muted-foreground">Building Detail — IDIS Monitoring</p>
        </div>
      </div>

      {/* Risk Engine Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-6 flex flex-col items-center justify-center shadow-sm">
          <RiskGauge score={riskScore} stage={stage} />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Escalation Stage</span>
            <p className="text-xl font-bold mt-1" style={{ color: getStageColor(stage) }}>{stage}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Survivability Window</span>
            <p className="text-xl font-mono font-bold text-foreground mt-1">
              {building.survivabilityTime} <span className="text-sm text-muted-foreground">min</span>
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">AI Prediction</span>
            <p className="text-sm text-stage-alert mt-1 font-medium">Escalation probable within 25 min</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-stage-safe" />
            <span className="text-sm text-foreground">Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{building.lastUpdated}</span>
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Node ID</span>
              <span className="font-mono text-foreground">{building.id.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="text-stage-safe font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Power</span>
              <span className="text-stage-safe font-medium">Battery OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Sensor Grid */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">Live Sensor Grid</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <SensorCard label="Temperature" value={sensors.temperature} unit="°C" status={getSensorStatus(sensors.temperature, [35, 50, 70])} trend={sensors.temperature > building.sensors.temperature ? "up" : "stable"} />
          <SensorCard label="Gas Level" value={sensors.gasLevel} unit="ppm" status={getSensorStatus(sensors.gasLevel, [200, 400, 600])} trend={sensors.gasLevel > building.sensors.gasLevel ? "up" : "stable"} />
          <SensorCard label="Vibration" value={sensors.vibration} unit="g" status={getSensorStatus(sensors.vibration, [0.5, 1.0, 2.0])} trend={sensors.vibration > building.sensors.vibration ? "up" : "stable"} />
          <SensorCard label="Motion" value={sensors.motion ? "Detected" : "None"} unit="" status={sensors.motion ? "Alert" : "Normal"} />
          <SensorCard label="Humidity" value={65} unit="%" status="Normal" trend="stable" />
          <SensorCard label="Smoke" value="Clear" unit="" status="Normal" />
        </div>
      </section>

      {/* Predictive AI */}
      <section>
        <h3 className="text-lg font-bold text-foreground mb-3">Predictive AI Analysis</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Risk Probability</span>
            <p className="text-3xl font-mono font-bold text-stage-danger mt-2">73%</p>
            <p className="text-xs text-muted-foreground mt-1">Escalation in next 30 min</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Forecast</span>
            <p className="text-lg font-bold text-stage-alert mt-2">Alert → Dangerous</p>
            <p className="text-xs text-muted-foreground mt-1">Predicted stage change</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Safe Window</span>
            <p className="text-3xl font-mono font-bold text-foreground mt-2">{building.survivabilityTime}m</p>
            <p className="text-xs text-muted-foreground mt-1">Countdown active</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Structural Index</span>
            <p className="text-3xl font-mono font-bold text-stage-safe mt-2">82</p>
            <p className="text-xs text-muted-foreground mt-1">Stability score</p>
          </div>
        </div>
      </section>

      <section><ChartsSection temperatureHistory={building.history.temperature} gasHistory={building.history.gasLevel} vibrationHistory={building.history.vibration} /></section>
      <section><EvacuationModule buildingName={building.name} /></section>
      <section><IncidentLog /></section>
      <section>
        <SimulationControls
          onSimulateFire={simulateFire}
          onSimulateEarthquake={simulateEarthquake}
          onSimulateGasExplosion={simulateGasExplosion}
          onReset={resetSystem}
        />
      </section>
    </div>
  );
};

export default BuildingDetail;
