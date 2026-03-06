import { useNavigate } from "react-router-dom";
import { Building, getRiskBg, getStageColor } from "@/data/mockData";

interface BuildingCardProps {
  building: Building;
}

const BuildingCard = ({ building }: BuildingCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/building/${building.id}`)}
      className={`w-full text-left rounded-lg border p-5 transition-all card-hover shadow-sm ${getRiskBg(building.stage)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-foreground">{building.name}</h3>
        <span
          className="h-3 w-3 rounded-full animate-pulse-glow"
          style={{ backgroundColor: getStageColor(building.stage) }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-muted-foreground">Risk Score</span>
          <span className="text-2xl font-mono font-bold" style={{ color: getStageColor(building.stage) }}>
            {building.riskScore}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Stage</span>
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{
              color: getStageColor(building.stage),
              backgroundColor: `${getStageColor(building.stage)}15`,
            }}
          >
            {building.stage}
          </span>
        </div>

        <div className="pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">{building.lastUpdated}</span>
        </div>
      </div>
    </button>
  );
};

export default BuildingCard;
