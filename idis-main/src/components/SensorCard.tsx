import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { getStageColor } from "@/data/mockData";

interface SensorCardProps {
  label: string;
  value: number | string;
  unit: string;
  status: "Normal" | "Alert" | "Dangerous" | "Critical";
  trend?: "up" | "down" | "stable";
}

const SensorCard = ({ label, value, unit, status, trend = "stable" }: SensorCardProps) => {
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm card-hover">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: getStageColor(status) }}
        />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-mono font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground mb-1">{unit}</span>
        <TrendIcon
          className="ml-auto mb-1"
          size={16}
          style={{ color: getStageColor(status) }}
        />
      </div>
    </div>
  );
};

export default SensorCard;
