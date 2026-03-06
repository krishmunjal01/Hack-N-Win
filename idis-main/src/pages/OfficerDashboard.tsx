import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, AlertTriangle, ClipboardCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock assigned buildings for the officer
const assignedBuildings = [
  { id: "B001", name: "City Mall Complex", zone: "Zone A", status: "safe", lastInspection: "2026-02-20", nextInspection: "2026-03-10", compliance: 92 },
  { id: "B002", name: "Heritage Tower", zone: "Zone A", status: "warning", lastInspection: "2026-01-15", nextInspection: "2026-03-05", compliance: 68 },
  { id: "B003", name: "Sunrise Apartments", zone: "Zone B", status: "critical", lastInspection: "2026-02-01", nextInspection: "2026-03-01", compliance: 45 },
];

const pendingInspections = [
  { buildingId: "B002", buildingName: "Heritage Tower", dueDate: "2026-03-05", priority: "high" },
  { buildingId: "B003", buildingName: "Sunrise Apartments", dueDate: "2026-03-01", priority: "critical" },
];

const localAlerts = [
  { id: "A1", building: "Sunrise Apartments", type: "Fire Sensor Offline", severity: "critical", time: "2 hours ago" },
  { id: "A2", building: "Heritage Tower", type: "Compliance Overdue", severity: "warning", time: "1 day ago" },
];

const OfficerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Officer Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome, {user?.name} — You have {assignedBuildings.length} assigned buildings
        </p>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Building2 className="text-primary" size={24} />
            <div>
              <p className="text-2xl font-bold">{assignedBuildings.length}</p>
              <p className="text-xs text-muted-foreground">Assigned Buildings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ClipboardCheck className="text-chart-2" size={24} />
            <div>
              <p className="text-2xl font-bold">{pendingInspections.length}</p>
              <p className="text-xs text-muted-foreground">Pending Inspections</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="text-destructive" size={24} />
            <div>
              <p className="text-2xl font-bold">{localAlerts.length}</p>
              <p className="text-xs text-muted-foreground">Active Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="text-chart-4" size={24} />
            <div>
              <p className="text-2xl font-bold">
                {assignedBuildings.filter(b => b.compliance < 70).length}
              </p>
              <p className="text-xs text-muted-foreground">Low Compliance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Buildings Table */}
      <Card>
        <CardHeader><CardTitle>My Assigned Buildings</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-2">Building</th>
                  <th className="text-left p-2">Zone</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Compliance</th>
                  <th className="text-left p-2">Next Inspection</th>
                </tr>
              </thead>
              <tbody>
                {assignedBuildings.map(b => (
                  <tr key={b.id} className="border-b border-border hover:bg-muted/50 cursor-pointer"
                      onClick={() => navigate(`/building/${b.id}`)}>
                    <td className="p-2 font-medium">{b.name}</td>
                    <td className="p-2">{b.zone}</td>
                    <td className="p-2">
                      <Badge variant={b.status === "critical" ? "destructive" : b.status === "warning" ? "secondary" : "default"}>
                        {b.status}
                      </Badge>
                    </td>
                    <td className="p-2">{b.compliance}%</td>
                    <td className="p-2">{b.nextInspection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Two-column: Pending Inspections + Local Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Pending Inspections</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pendingInspections.map(ins => (
              <div key={ins.buildingId} className="flex justify-between items-center p-3 rounded-md bg-muted/30 border border-border">
                <div>
                  <p className="font-medium text-sm">{ins.buildingName}</p>
                  <p className="text-xs text-muted-foreground">Due: {ins.dueDate}</p>
                </div>
                <Badge variant={ins.priority === "critical" ? "destructive" : "secondary"}>
                  {ins.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Local Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {localAlerts.map(alert => (
              <div key={alert.id} className="flex justify-between items-center p-3 rounded-md bg-muted/30 border border-border">
                <div>
                  <p className="font-medium text-sm">{alert.type}</p>
                  <p className="text-xs text-muted-foreground">{alert.building} · {alert.time}</p>
                </div>
                <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficerDashboard;
