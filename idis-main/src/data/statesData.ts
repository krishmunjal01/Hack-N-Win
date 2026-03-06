export interface StateInfo {
  id: string;
  name: string;
  code: string;
  riskScore: number;
  buildings: number;
  activeAlerts: number;
  criticalBuildings: number;
  stage: "Normal" | "Alert" | "Dangerous" | "Critical";
  districts: DistrictInfo[];
}

export interface DistrictInfo {
  id: string;
  name: string;
  riskScore: number;
  buildings: number;
  activeAlerts: number;
  stage: "Normal" | "Alert" | "Dangerous" | "Critical";
}

export const statesData: StateInfo[] = [
  {
    id: "MH", name: "Maharashtra", code: "MH", riskScore: 62, buildings: 2340, activeAlerts: 34, criticalBuildings: 8, stage: "Dangerous",
    districts: [
      { id: "MH-MUM", name: "Mumbai", riskScore: 72, buildings: 820, activeAlerts: 18, stage: "Dangerous" },
      { id: "MH-PUN", name: "Pune", riskScore: 45, buildings: 560, activeAlerts: 8, stage: "Alert" },
      { id: "MH-NAG", name: "Nagpur", riskScore: 38, buildings: 340, activeAlerts: 4, stage: "Alert" },
      { id: "MH-NAS", name: "Nashik", riskScore: 25, buildings: 280, activeAlerts: 2, stage: "Normal" },
    ],
  },
  {
    id: "DL", name: "Delhi", code: "DL", riskScore: 71, buildings: 980, activeAlerts: 42, criticalBuildings: 12, stage: "Dangerous",
    districts: [
      { id: "DL-CEN", name: "Central Delhi", riskScore: 78, buildings: 340, activeAlerts: 18, stage: "Critical" },
      { id: "DL-SOU", name: "South Delhi", riskScore: 55, buildings: 280, activeAlerts: 12, stage: "Alert" },
      { id: "DL-NOR", name: "North Delhi", riskScore: 62, buildings: 220, activeAlerts: 8, stage: "Dangerous" },
    ],
  },
  {
    id: "GJ", name: "Gujarat", code: "GJ", riskScore: 45, buildings: 1820, activeAlerts: 18, criticalBuildings: 3, stage: "Alert",
    districts: [
      { id: "GJ-AHM", name: "Ahmedabad", riskScore: 52, buildings: 640, activeAlerts: 8, stage: "Alert" },
      { id: "GJ-SUR", name: "Surat", riskScore: 38, buildings: 480, activeAlerts: 5, stage: "Alert" },
      { id: "GJ-VAD", name: "Vadodara", riskScore: 28, buildings: 320, activeAlerts: 3, stage: "Normal" },
    ],
  },
  {
    id: "TN", name: "Tamil Nadu", code: "TN", riskScore: 28, buildings: 1560, activeAlerts: 8, criticalBuildings: 1, stage: "Normal",
    districts: [
      { id: "TN-CHE", name: "Chennai", riskScore: 35, buildings: 580, activeAlerts: 4, stage: "Alert" },
      { id: "TN-COI", name: "Coimbatore", riskScore: 20, buildings: 380, activeAlerts: 2, stage: "Normal" },
      { id: "TN-MAD", name: "Madurai", riskScore: 18, buildings: 260, activeAlerts: 1, stage: "Normal" },
    ],
  },
  {
    id: "KA", name: "Karnataka", code: "KA", riskScore: 22, buildings: 1420, activeAlerts: 5, criticalBuildings: 0, stage: "Normal",
    districts: [
      { id: "KA-BLR", name: "Bengaluru", riskScore: 28, buildings: 620, activeAlerts: 3, stage: "Normal" },
      { id: "KA-MYS", name: "Mysuru", riskScore: 15, buildings: 340, activeAlerts: 1, stage: "Normal" },
    ],
  },
  {
    id: "RJ", name: "Rajasthan", code: "RJ", riskScore: 55, buildings: 890, activeAlerts: 22, criticalBuildings: 5, stage: "Alert",
    districts: [
      { id: "RJ-JAI", name: "Jaipur", riskScore: 58, buildings: 380, activeAlerts: 12, stage: "Alert" },
      { id: "RJ-JOD", name: "Jodhpur", riskScore: 48, buildings: 240, activeAlerts: 6, stage: "Alert" },
    ],
  },
  {
    id: "UP", name: "Uttar Pradesh", code: "UP", riskScore: 48, buildings: 2100, activeAlerts: 28, criticalBuildings: 6, stage: "Alert",
    districts: [
      { id: "UP-LKO", name: "Lucknow", riskScore: 52, buildings: 580, activeAlerts: 10, stage: "Alert" },
      { id: "UP-AGR", name: "Agra", riskScore: 45, buildings: 420, activeAlerts: 8, stage: "Alert" },
      { id: "UP-VNS", name: "Varanasi", riskScore: 38, buildings: 340, activeAlerts: 5, stage: "Alert" },
    ],
  },
  {
    id: "KL", name: "Kerala", code: "KL", riskScore: 18, buildings: 640, activeAlerts: 3, criticalBuildings: 0, stage: "Normal",
    districts: [
      { id: "KL-TVM", name: "Thiruvananthapuram", riskScore: 22, buildings: 280, activeAlerts: 2, stage: "Normal" },
      { id: "KL-EKM", name: "Ernakulam", riskScore: 15, buildings: 180, activeAlerts: 1, stage: "Normal" },
    ],
  },
];

export function getStateById(id: string): StateInfo | undefined {
  return statesData.find((s) => s.id === id);
}

// Map state names to their codes
export const stateNameToCode: Record<string, string> = {
  "Maharashtra": "MH",
  "Delhi": "DL",
  "Gujarat": "GJ",
  "Tamil Nadu": "TN",
  "Karnataka": "KA",
  "Telangana": "TG",
  "Rajasthan": "RJ",
  "West Bengal": "WB",
  "Kerala": "KL",
};

export const getStateCodeByName = (stateName: string): string | null => {
  return stateNameToCode[stateName] || null;
};
