import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

interface ChartsSectionProps {
  temperatureHistory: number[];
  gasHistory: number[];
  vibrationHistory: number[];
}

const TrendChart = ({ data, label, color, unit }: { data: number[]; label: string; color: string; unit: string }) => {
  const chartData = data.map((val, i) => ({ reading: i + 1, value: val }));

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h4 className="text-sm font-semibold text-foreground mb-3">
        {label} <span className="text-muted-foreground font-normal">({unit})</span>
      </h4>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="reading" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))", fontSize: 12 }} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChartsSection = ({ temperatureHistory, gasHistory, vibrationHistory }: ChartsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Trend Analysis</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TrendChart data={temperatureHistory} label="Temperature" color="hsl(var(--stage-danger))" unit="°C" />
        <TrendChart data={gasHistory} label="Gas Level" color="hsl(var(--stage-alert))" unit="ppm" />
        <TrendChart data={vibrationHistory} label="Structural Vibration" color="hsl(var(--primary))" unit="g" />
      </div>
    </div>
  );
};

export default ChartsSection;
