import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Loader2 } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { getMonthlyIncidents, getDisasterDistribution, MonthlyIncident } from "@/services/analyticsService";

const COLORS = ["hsl(var(--stage-critical))", "hsl(var(--stage-alert))", "hsl(var(--primary))", "hsl(var(--stage-danger))", "hsl(var(--muted-foreground))"];

const Analytics = () => {
  const [monthly, setMonthly] = useState<MonthlyIncident[]>([]);
  const [distribution, setDistribution] = useState<{ type: string; count: number; percentage: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMonthlyIncidents(), getDisasterDistribution()]).then(([m, d]) => {
      setMonthly(m);
      setDistribution(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <BarChart3 className="text-primary" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Intelligence</h1>
          <p className="text-sm text-muted-foreground">National disaster data visualization</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Incidents (6mo)", value: "230", trend: "+12%" },
          { label: "Avg Response Time", value: "4.2 min", trend: "-8%" },
          { label: "AI Model Accuracy", value: "94.7%", trend: "+2.1%" },
          { label: "Resource Efficiency", value: "87%", trend: "+5%" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-sm card-hover">
            <p className="text-2xl font-mono font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <p className="text-xs text-stage-safe mt-1 flex items-center gap-1">
              <TrendingUp size={10} /> {s.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Incidents */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Monthly Incident Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Legend />
            <Bar dataKey="fire" name="Fire" fill="hsl(var(--stage-critical))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="earthquake" name="Earthquake" fill="hsl(var(--stage-danger))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gasLeak" name="Gas Leak" fill="hsl(var(--stage-alert))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="structural" name="Structural" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Disaster Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={distribution} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={80} label={({ type, percentage }) => `${type} ${percentage}%`}>
                {distribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">State-wise Risk Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={[
              { state: "Delhi", risk: 71 },
              { state: "Maharashtra", risk: 62 },
              { state: "Rajasthan", risk: 55 },
              { state: "UP", risk: 48 },
              { state: "Gujarat", risk: 45 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis dataKey="state" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
