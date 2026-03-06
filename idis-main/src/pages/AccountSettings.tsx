import { useState } from "react";
import { Settings, User, Bell, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";
import { getRoleLabel } from "@/services/authService";
import { toast } from "@/hooks/use-toast";

const activityLogs = [
  { time: "2026-03-01 12:01", action: "Accessed Building D detail page" },
  { time: "2026-03-01 11:45", action: "Triggered evacuation simulation" },
  { time: "2026-03-01 11:30", action: "Viewed National Control Center" },
  { time: "2026-03-01 10:15", action: "Logged in from 192.168.1.45" },
  { time: "2026-02-28 18:00", action: "Updated notification preferences" },
];

const AccountSettings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Settings className="text-primary" size={24} />
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Account Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><User size={16} /> Profile</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Role</label>
            <Input value={user ? getRoleLabel(user.role) : ""} disabled className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Officer ID</label>
            <Input value={user?.id || ""} disabled className="mt-1 font-mono" />
          </div>
        </div>
        <Button onClick={() => toast({ title: "Profile updated" })}>Save Changes</Button>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Bell size={16} /> Notifications</h3>
        <div className="space-y-3 text-sm">
          {["Critical alerts", "Evacuation notifications", "System updates", "Weekly reports"].map((n) => (
            <div key={n} className="flex items-center justify-between">
              <span className="text-foreground">{n}</span>
              <div className="h-5 w-9 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Shield size={16} /> Security</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Session Timeout</span>
          <span className="font-mono text-foreground">30 minutes</span>
        </div>
        <Button variant="outline">Change Password</Button>
      </div>

      {/* Activity Logs */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2"><Clock size={16} /> Activity Log</h3>
        <div className="space-y-2">
          {activityLogs.map((log, i) => (
            <div key={i} className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
              <span className="text-foreground">{log.action}</span>
              <span className="text-xs font-mono text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
