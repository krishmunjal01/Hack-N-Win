import { getStageColor } from "@/data/mockData";
import type { Building } from "@/data/mockData";

interface RiskGaugeProps {
  score: number;
  stage: Building["stage"];
}

const RiskGauge = ({ score, stage }: RiskGaugeProps) => {
  const rotation = (score / 100) * 180 - 90;
  const color = getStageColor(stage);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full border-[8px] border-b-0" style={{ borderColor: "hsl(var(--border))" }} />
        <div className="absolute inset-0 rounded-t-full border-[8px] border-b-0 transition-all duration-700" style={{ borderColor: color, clipPath: `polygon(0 100%, 0 0, ${score}% 0, ${score}% 100%)` }} />
        <div className="absolute bottom-0 left-1/2 origin-bottom h-16 w-0.5 transition-transform duration-700" style={{ backgroundColor: color, transform: `translateX(-50%) rotate(${rotation}deg)` }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <span className="text-4xl font-mono font-bold mt-2" style={{ color }}>{score}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-widest">Risk Score</span>
    </div>
  );
};

export default RiskGauge;
