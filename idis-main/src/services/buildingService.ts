import { Building, mockBuildings } from "@/data/mockData";

// TODO: Replace with backend API
export async function getBuildingData(id: string): Promise<Building | undefined> {
  return mockBuildings.find((b) => b.id === id);
}

export async function getAllBuildings(): Promise<Building[]> {
  return mockBuildings;
}

export async function getBuildingsByState(stateId: string): Promise<Building[]> {
  // TODO: Filter by state from backend
  return mockBuildings;
}

export async function triggerEvacuation(buildingId: string): Promise<{ success: boolean }> {
  return { success: true };
}

export async function notifyFireDepartment(buildingId: string): Promise<{ success: boolean }> {
  return { success: true };
}

export async function sendBuildingAlert(buildingId: string, message: string): Promise<{ success: boolean }> {
  return { success: true };
}
