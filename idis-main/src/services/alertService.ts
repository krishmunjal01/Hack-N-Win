import axios from "axios";

const API = "http://localhost:8082/api/alerts";

export interface AlertRecord {
  id: string;
  type: "building_alert" | "broadcast" | "sms" | "email" | "evacuation" | "district_alert";
  target: string;
  message: string;
  timestamp: string;
  status: "sent" | "pending" | "failed";
}

export interface AlertRequest {
  title: string;
  message: string;
  severity: string;
  sender?: string;
  buildingId?: string;
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

// Real API-based functions with Twilio and Email integration
export async function sendBuildingAlert(buildingName: string, message: string): Promise<AlertRecord> {
  try {
    const alertData: AlertRequest = {
      title: buildingName,
      message: message,
      severity: "HIGH",
      sender: "Building Alert System",
      buildingId: buildingName,
    };
    const res = await axios.post(`${API}/send`, alertData);
    console.log("Building alert sent:", res.data);
    return createAlert("building_alert", buildingName, message);
  } catch (error) {
    console.error("Failed to send building alert:", error);
    return createAlert("building_alert", buildingName, `Failed: ${message}`);
  }
}

export async function broadcastNationalAlert(message: string): Promise<AlertRecord> {
  try {
    const alertData: AlertRequest = {
      title: "National Broadcast Alert",
      message: message,
      severity: "CRITICAL",
      sender: "National Control Center",
    };
    const res = await axios.post(`${API}/broadcast`, alertData);
    console.log("Broadcast alert sent:", res.data);
    return createAlert("broadcast", "All Stations", message);
  } catch (error) {
    console.error("Failed to send broadcast alert:", error);
    return createAlert("broadcast", "All Stations", `Failed: ${message}`);
  }
}

export async function sendSMSAlert(target: string, message: string): Promise<AlertRecord> {
  try {
    const alertData: AlertRequest = {
      title: "SMS Alert",
      message: message,
      severity: "HIGH",
      sender: target,
    };
    const res = await axios.post(`${API}/sms`, alertData);
    console.log("SMS alert sent:", res.data);
    return createAlert("sms", target, message);
  } catch (error) {
    console.error("Failed to send SMS alert:", error);
    return createAlert("sms", target, `Failed: ${message}`);
  }
}

export async function sendEmailAlert(target: string, message: string): Promise<AlertRecord> {
  try {
    const alertData: AlertRequest = {
      title: "Email Alert",
      message: message,
      severity: "HIGH",
      sender: target,
    };
    const res = await axios.post(`${API}/email`, alertData);
    console.log("Email alert sent:", res.data);
    return createAlert("email", target, message);
  } catch (error) {
    console.error("Failed to send email alert:", error);
    return createAlert("email", target, `Failed: ${message}`);
  }
}

export async function sendDistrictAlert(districtName: string, message: string): Promise<AlertRecord> {
  try {
    const alertData: AlertRequest = {
      title: districtName,
      message: message,
      severity: "MEDIUM",
      sender: "District Alert System",
    };
    const res = await axios.post(`${API}/send`, alertData);
    console.log("District alert sent:", res.data);
    return createAlert("district_alert", districtName, message);
  } catch (error) {
    console.error("Failed to send district alert:", error);
    return createAlert("district_alert", districtName, `Failed: ${message}`);
  }
}
