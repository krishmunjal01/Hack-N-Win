export interface BuildingSensors {
  temperature: number;
  gasLevel: number;
  vibration: number;
  motion: number;
}

export interface SensorHistory {
  temperature: number[];
  gasLevel: number[];
  vibration: number[];
}

export interface Building {
  id: string;
  name: string;
  riskScore: number;
  stage: "Normal" | "Alert" | "Dangerous" | "Critical";
  survivabilityTime: number;
  sensors: BuildingSensors;
  history: SensorHistory;
  lastUpdated: string;
}

const generateHistory = (base: number, variance: number, count = 30): number[] =>
  Array.from({ length: count }, () =>
    Math.round((base + (Math.random() - 0.5) * variance) * 100) / 100
  );

// Real hardware node placeholder
export const mockBuildings: Building[] = [
  {
    id: "building_a",
    name: "Building A", // Real hardware node placeholder
    riskScore: 12,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 24, gasLevel: 50, vibration: 0.1, motion: 0 },
    history: {
      temperature: generateHistory(24, 4),
      gasLevel: generateHistory(50, 20),
      vibration: generateHistory(0.1, 0.05),
    },
    lastUpdated: "2026-03-01 12:00:00",
  },
  {
    id: "building_b",
    name: "Building B",
    riskScore: 15,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 25, gasLevel: 60, vibration: 0.12, motion: 0 },
    history: {
      temperature: generateHistory(25, 4),
      gasLevel: generateHistory(60, 20),
      vibration: generateHistory(0.12, 0.05),
    },
    lastUpdated: "2026-03-01 11:58:00",
  },
  {
    id: "building_c",
    name: "Building C",
    riskScore: 12,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 24, gasLevel: 50, vibration: 0.1, motion: 0 },
    history: {
      temperature: generateHistory(24, 4),
      gasLevel: generateHistory(50, 20),
      vibration: generateHistory(0.1, 0.05),
    },
    lastUpdated: "2026-03-01 11:55:00",
  },
  {
    id: "building_d",
    name: "Building D",
    riskScore: 10,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 23, gasLevel: 45, vibration: 0.08, motion: 0 },
    history: {
      temperature: generateHistory(23, 4),
      gasLevel: generateHistory(45, 20),
      vibration: generateHistory(0.08, 0.05),
    },
    lastUpdated: "2026-03-01 12:01:00",
  },
  {
    id: "building_e",
    name: "Building E",
    riskScore: 20,
    stage: "Normal",
    survivabilityTime: 90,
    sensors: { temperature: 26, gasLevel: 80, vibration: 0.15, motion: 0 },
    history: {
      temperature: generateHistory(26, 5),
      gasLevel: generateHistory(80, 30),
      vibration: generateHistory(0.15, 0.08),
    },
    lastUpdated: "2026-03-01 11:50:00",
  },
  {
    id: "building_f",
    name: "Building F",
    riskScore: 16,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 26, gasLevel: 65, vibration: 0.1, motion: 0 },
    history: {
      temperature: generateHistory(26, 4),
      gasLevel: generateHistory(65, 20),
      vibration: generateHistory(0.1, 0.05),
    },
    lastUpdated: "2026-03-01 11:59:00",
  },
  {
    id: "B001",
    name: "City Mall Complex",
    riskScore: 8,
    stage: "Normal",
    survivabilityTime: 150,
    sensors: { temperature: 22, gasLevel: 40, vibration: 0.08, motion: 2 },
    history: {
      temperature: generateHistory(22, 3),
      gasLevel: generateHistory(40, 15),
      vibration: generateHistory(0.08, 0.04),
    },
    lastUpdated: "2026-03-01 12:05:00",
  },
  {
    id: "B002",
    name: "Heritage Tower",
    riskScore: 14,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 24, gasLevel: 55, vibration: 0.09, motion: 0 },
    history: {
      temperature: generateHistory(24, 4),
      gasLevel: generateHistory(55, 20),
      vibration: generateHistory(0.09, 0.05),
    },
    lastUpdated: "2026-03-01 12:04:00",
  },
  {
    id: "B003",
    name: "Sunrise Apartments",
    riskScore: 11,
    stage: "Normal",
    survivabilityTime: 120,
    sensors: { temperature: 23, gasLevel: 48, vibration: 0.07, motion: 0 },
    history: {
      temperature: generateHistory(23, 4),
      gasLevel: generateHistory(48, 20),
      vibration: generateHistory(0.07, 0.05),
    },
    lastUpdated: "2026-03-01 12:03:00",
  },
];

// TODO: Replace with API call later
// Example: fetch("/api/building/" + id)
export async function fetchBuildingData(id: string): Promise<Building | undefined> {
  return mockBuildings.find((b) => b.id === id);
}

export async function fetchAllBuildings(): Promise<Building[]> {
  return mockBuildings;
}

export function getStageColor(stage: Building["stage"]): string {
  switch (stage) {
    case "Normal":
      return "hsl(var(--stage-safe))";
    case "Alert":
      return "hsl(var(--stage-alert))";
    case "Dangerous":
      return "hsl(var(--stage-danger))";
    case "Critical":
      return "hsl(var(--stage-critical))";
  }
}

export function getRiskBg(stage: Building["stage"]): string {
  switch (stage) {
    case "Normal":
      return "bg-stage-safe/10 border-stage-safe/30";
    case "Alert":
      return "bg-stage-alert/10 border-stage-alert/30";
    case "Dangerous":
      return "bg-stage-danger/10 border-stage-danger/30";
    case "Critical":
      return "bg-stage-critical/10 border-stage-critical/30";
  }
}
