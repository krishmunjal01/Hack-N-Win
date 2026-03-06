export interface AlertRecord {
  id: string;
  type: "building_alert" | "broadcast" | "sms" | "email" | "evacuation" | "district_alert";
  target: string;
  message: string;
  timestamp: string;
  status: "sent" | "pending" | "failed";
}

let alertHistory: AlertRecord[] = [];
let alertIdCounter = 1;

function createAlert(type: AlertRecord["type"], target: string, message: string): AlertRecord {
  const alert: AlertRecord = {
    id: `ALR-${String(alertIdCounter++).padStart(4, "0")}`,
    type,
    target,
    message,
    timestamp: new Date().toISOString(),
    status: "sent",
  };
  alertHistory = [alert, ...alertHistory];
  return alert;
}

export function getAlertHistory(): AlertRecord[] {
  return alertHistory;
}

export function clearAlertHistory(): void {
  alertHistory = [];
}

// API-ready functions — replace with real API calls later
export async function sendBuildingAlert(buildingName: string, message: string): Promise<AlertRecord> {
  // TODO: Replace with API call
  return createAlert("building_alert", buildingName, message);
}

export async function broadcastNationalAlert(message: string): Promise<AlertRecord> {
  // TODO: Replace with API call
  return createAlert("broadcast", "All Stations", message);
}

export async function sendSMSAlert(target: string, message: string): Promise<AlertRecord> {
  // TODO: Replace with WhatsApp/SMS API (Twilio, etc.)
  return createAlert("sms", target, message);
}

export async function sendEmailAlert(target: string, message: string): Promise<AlertRecord> {
  // TODO: Replace with EmailJS or backend API
  return createAlert("email", target, message);
}

export async function sendDistrictAlert(districtName: string, message: string): Promise<AlertRecord> {
  return createAlert("district_alert", districtName, message);
}
