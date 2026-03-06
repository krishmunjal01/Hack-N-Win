import { Flame, Mountain, Wind, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SimulationControlsProps {
  onSimulateFire: () => void;
  onSimulateEarthquake: () => void;
  onSimulateGasExplosion?: () => void;
  onReset: () => void;
}

const SimulationControls = ({ onSimulateFire, onSimulateEarthquake, onSimulateGasExplosion, onReset }: SimulationControlsProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="text-lg font-bold text-foreground mb-4">Simulation Controls</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => { onSimulateFire(); toast({ title: "🔥 Fire Simulation Active", description: "Temperature and gas levels increased. Stage → Dangerous" }); }}
          className="bg-stage-danger/10 text-stage-danger border border-stage-danger/30 hover:bg-stage-danger/20 transition-all"
          variant="outline"
        >
          <Flame size={16} className="mr-1" />
          Simulate Fire
        </Button>
        <Button
          onClick={() => { onSimulateEarthquake(); toast({ title: "🌍 Earthquake Simulation Active", description: "Vibration spike detected. Stage → Critical" }); }}
          className="bg-stage-alert/10 text-stage-alert border border-stage-alert/30 hover:bg-stage-alert/20 transition-all"
          variant="outline"
        >
          <Mountain size={16} className="mr-1" />
          Simulate Earthquake
        </Button>
        {onSimulateGasExplosion && (
          <Button
            onClick={() => { onSimulateGasExplosion(); toast({ title: "💨 Gas Explosion Simulation Active", description: "Gas levels critical. Stage → Critical" }); }}
            className="bg-stage-critical/10 text-stage-critical border border-stage-critical/30 hover:bg-stage-critical/20 transition-all"
            variant="outline"
          >
            <Wind size={16} className="mr-1" />
            Simulate Gas Explosion
          </Button>
        )}
        <Button
          onClick={() => { onReset(); toast({ title: "✅ System Reset", description: "All sensors restored to baseline values." }); }}
          variant="outline"
          className="transition-all"
        >
          <RotateCcw size={16} className="mr-1" />
          Reset System
        </Button>
      </div>
    </div>
  );
};

export default SimulationControls;
