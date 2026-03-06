export interface NationalStats {
  totalBuildings: number;
  criticalIncidents: number;
  activeAlerts: number;
  statesMonitored: number;
  avgRiskIndex: number;
  evacuationsToday: number;
}

export interface MonthlyIncident {
  month: string;
  fire: number;
  earthquake: number;
  gasLeak: number;
  structural: number;
}

export interface StateRisk {
  state: string;
  stateId: string;
  riskScore: number;
  buildings: number;
  activeAlerts: number;
  stage: "Normal" | "Alert" | "Dangerous" | "Critical";
}

// TODO: Replace with backend API
export async function getNationalStats(): Promise<NationalStats> {
  return {
    totalBuildings: 12847,
    criticalIncidents: 23,
    activeAlerts: 156,
    statesMonitored: 28,
    avgRiskIndex: 34,
    evacuationsToday: 3,
  };
}

export async function getMonthlyIncidents(): Promise<MonthlyIncident[]> {
  return [
    { month: "Sep", fire: 12, earthquake: 2, gasLeak: 8, structural: 4 },
    { month: "Oct", fire: 18, earthquake: 1, gasLeak: 11, structural: 6 },
    { month: "Nov", fire: 9, earthquake: 5, gasLeak: 7, structural: 3 },
    { month: "Dec", fire: 22, earthquake: 0, gasLeak: 14, structural: 8 },
    { month: "Jan", fire: 15, earthquake: 3, gasLeak: 9, structural: 5 },
    { month: "Feb", fire: 11, earthquake: 1, gasLeak: 6, structural: 2 },
  ];
}

export async function getStateRisks(): Promise<StateRisk[]> {
  return [
    { state: "Maharashtra", stateId: "MH", riskScore: 62, buildings: 2340, activeAlerts: 34, stage: "Dangerous" },
    { state: "Gujarat", stateId: "GJ", riskScore: 45, buildings: 1820, activeAlerts: 18, stage: "Alert" },
    { state: "Tamil Nadu", stateId: "TN", riskScore: 28, buildings: 1560, activeAlerts: 8, stage: "Normal" },
    { state: "Delhi", stateId: "DL", riskScore: 71, buildings: 980, activeAlerts: 42, stage: "Dangerous" },
    { state: "Karnataka", stateId: "KA", riskScore: 22, buildings: 1420, activeAlerts: 5, stage: "Normal" },
    { state: "Rajasthan", stateId: "RJ", riskScore: 55, buildings: 890, activeAlerts: 22, stage: "Alert" },
    { state: "Uttar Pradesh", stateId: "UP", riskScore: 48, buildings: 2100, activeAlerts: 28, stage: "Alert" },
    { state: "West Bengal", stateId: "WB", riskScore: 35, buildings: 760, activeAlerts: 12, stage: "Alert" },
    { state: "Kerala", stateId: "KL", riskScore: 18, buildings: 640, activeAlerts: 3, stage: "Normal" },
    { state: "Madhya Pradesh", stateId: "MP", riskScore: 41, buildings: 520, activeAlerts: 15, stage: "Alert" },
  ];
}

export async function getDisasterDistribution(): Promise<{ type: string; count: number; percentage: number }[]> {
  return [
    { type: "Fire", count: 87, percentage: 38 },
    { type: "Gas Leak", count: 55, percentage: 24 },
    { type: "Structural", count: 42, percentage: 18 },
    { type: "Earthquake", count: 28, percentage: 12 },
    { type: "Other", count: 18, percentage: 8 },
  ];
}
