import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2, AlertTriangle, Shield, Activity, TrendingUp, Siren, Loader2
} from "lucide-react";
import { NationalStats, StateRisk, getNationalStats, getStateRisks } from "@/services/analyticsService";
import { getStageColor } from "@/data/mockData";
import IndiaMap from "@/components/IndiaMap";
import { useTranslation } from "react-i18next";

const NationalControlCenter = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stats, setStats] = useState<NationalStats | null>(null);
  const [states, setStates] = useState<StateRisk[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getNationalStats(), getStateRisks()]).then(([s, st]) => {
      setStats(s);
      setStates(st);
      setLoading(false);
    });
  }, []);

  const filteredStates = filter === "all" ? states : states.filter((s) => s.stage === filter);

  const statCards = stats
    ? [
        { icon: Building2, label: t("ncc_total_buildings"), value: stats.totalBuildings.toLocaleString(), color: "text-primary" },
        { icon: AlertTriangle, label: t("ncc_critical_incidents"), value: stats.criticalIncidents.toString(), color: "text-stage-critical" },
        { icon: Siren, label: t("ncc_active_alerts"), value: stats.activeAlerts.toString(), color: "text-stage-alert" },
        { icon: Shield, label: t("ncc_states_monitored"), value: stats.statesMonitored.toString(), color: "text-primary" },
        { icon: Activity, label: t("ncc_avg_risk_index"), value: stats.avgRiskIndex.toString(), color: "text-stage-danger" },
        { icon: TrendingUp, label: t("ncc_evacuations_today"), value: stats.evacuationsToday.toString(), color: "text-stage-critical" },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("ncc_title")}</h1>
        <p className="text-sm text-muted-foreground">{t("ncc_subtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-sm card-hover">
            <s.icon className={`${s.color} mb-2`} size={20} />
            <p className="text-2xl font-mono font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* India Map + Active Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">{t("ncc_india_risk_map")}</h3>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <IndiaMap />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-stage-critical" /> {t("ncc_active_alerts")}
          </h3>
          <div className="space-y-3 max-h-80 overflow-auto">
            {states
              .filter((s) => s.activeAlerts > 10)
              .sort((a, b) => b.riskScore - a.riskScore)
              .map((s) => (
                <button
                  key={s.stateId}
                  className="w-full text-left rounded-md border border-border bg-muted/30 p-3 hover:bg-accent transition-colors"
                  onClick={() => navigate(`/dashboard/states/${s.stateId}`)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{s.state}</span>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getStageColor(s.stage) }} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{s.activeAlerts} {t("ncc_alerts")}</span>
                    <span>{t("ncc_risk")}: {s.riskScore}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">{t("ncc_filter")}:</span>
        {["all", "Normal", "Alert", "Dangerous", "Critical"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {f === "all" ? t("ncc_all_states") : t(`ncc_${f.toLowerCase()}`)}
          </button>
        ))}
      </div>

      {/* States Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStates.map((s) => (
          <button
            key={s.stateId}
            onClick={() => navigate(`/dashboard/states/${s.stateId}`)}
            className="text-left rounded-lg border border-border bg-card p-5 shadow-sm card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-foreground">{s.state}</h4>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: getStageColor(s.stage) }} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("ncc_risk_score")}</span>
                <span className="font-mono font-bold" style={{ color: getStageColor(s.stage) }}>{s.riskScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("ncc_buildings")}</span>
                <span className="text-foreground">{s.buildings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("ncc_active_alerts")}</span>
                <span className="text-foreground">{s.activeAlerts}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NationalControlCenter;
