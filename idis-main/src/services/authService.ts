import axios from "axios";
import { getStateCodeByName } from "@/data/statesData";

const API_BASE_URL = "http://localhost:8082/api/auth";

export type UserRole =
  | "national_admin"
  | "state_officer"
  | "district_officer"
  | "building_authority"
  | "emergency_response";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  state?: string;
  district?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
  state?: string;
  district?: string;
}

// 🔥 LOGIN → Calls Backend
export async function login(credentials: LoginCredentials): Promise<string> {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data; // "OTP sent" OR error message
}

// 🔥 VERIFY OTP → Calls Backend
export async function verifyOTP(email: string, otp: string): Promise<string> {
  const response = await axios.post(`${API_BASE_URL}/verify-otp`, {
    email,
    otp,
  });
  return response.data; // "Login successful" OR error message
}

// 🔥 GET USER BY EMAIL → Fetch user data from backend
export async function getCurrentUser(email: string): Promise<AuthUser> {
  const response = await axios.get(`${API_BASE_URL}/user/${email}`);
  return response.data; // Returns user object with role, state, district
}

// 🔥 REGISTER → Calls Backend
export async function register(data: RegisterData): Promise<string> {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
}

// 🔥 LOGOUT
export async function logout(): Promise<void> {
  localStorage.removeItem("user");
}

// UI helpers (keep these)
export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    national_admin: "National Administrator",
    state_officer: "State Administrator",
    district_officer: "District Administrator",
    building_authority: "Building Authority Officer",
    emergency_response: "Emergency Response Officer",
  };
  return labels[role];
}

export function getRoleAccent(role: UserRole): string {
  switch (role) {
    case "national_admin": return "role-national";
    case "state_officer": return "role-state";
    case "district_officer": return "role-district";
    default: return "role-officer";
  }
}

// 🔥 ROLE-BASED REDIRECT PATH
export function getRedirectPath(user: AuthUser): string {
  switch (user.role) {
    case "national_admin":
      return "/dashboard";
    case "state_officer":
      if (user.state) {
        // Convert state name to state code
        const stateCode = getStateCodeByName(user.state);
        return stateCode ? `/dashboard/states/${stateCode}` : "/dashboard";
      }
      return "/dashboard";
    case "district_officer":
      return "/dashboard/district";
    case "building_authority":
      return "/dashboard/officer";
    default:
      return "/dashboard/buildings";
  }
}