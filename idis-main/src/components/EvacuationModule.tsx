import { useState } from "react";
import { Siren, Bell, Mail, Phone, MessageSquare, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { sendBuildingAlert, broadcastNationalAlert, sendSMSAlert, sendEmailAlert, getAlertHistory } from "@/services/alertService";

interface EvacuationModuleProps {
  buildingName: string;
}

const EvacuationModule = ({ buildingName }: EvacuationModuleProps) => {
  const [evacuationActive, setEvacuationActive] = useState(false);

  const handleEvacuation = () => {
    setEvacuationActive(true);
    toast({ title: "🚨 Evacuation Alert Triggered", description: `${buildingName} evacuation protocol activated.` });
  };

  const handleSendAlert = async () => {
    const alert = await sendBuildingAlert(buildingName, `Emergency alert for ${buildingName}. All occupants proceed to nearest exit.`);
    toast({ title: "Alert Sent", description: `Alert ${alert.id} sent to ${buildingName}` });
  };

  const handleBroadcast = async () => {
    const alert = await broadcastNationalAlert(`Emergency broadcast: Critical situation at ${buildingName}. All response units mobilize.`);
    toast({ title: "Broadcast Sent", description: `National broadcast ${alert.id} dispatched to all stations.` });
  };

  const handleSMS = async () => {
    const alert = await sendSMSAlert(buildingName, `IDIS ALERT: Emergency at ${buildingName}. Evacuate immediately.`);
    toast({ title: "SMS Alert Sent", description: `SMS alert ${alert.id} dispatched. Ready for WhatsApp/Twilio integration.` });
  };

  const handleEmail = async () => {
    const alert = await sendEmailAlert(buildingName, `IDIS Emergency Notification: Critical incident at ${buildingName}. Immediate action required.`);
    toast({ title: "Email Alert Sent", description: `Email alert ${alert.id} dispatched. Ready for EmailJS integration.` });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Evacuation Management</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Evacuation Plan */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-3 shadow-sm">
          <h4 className="font-semibold text-foreground text-sm">Auto-Generated Evacuation Plan</h4>
          <div className="space-y-2 text-sm">
            {[
              { floor: "Floor 4 (Top)", occupancy: 12, status: "Evacuating", route: "Stairwell B → Exit 2" },
              { floor: "Floor 3", occupancy: 28, status: "Standby", route: "Stairwell A → Exit 1" },
              { floor: "Floor 2", occupancy: 45, status: "Standby", route: "Stairwell A → Exit 1" },
              { floor: "Floor 1 (Ground)", occupancy: 62, status: "Safe", route: "Main Exit" },
            ].map((f) => (
              <div key={f.floor} className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border">
                <div>
                  <p className="font-medium text-foreground">{f.floor}</p>
                  <p className="text-xs text-muted-foreground">{f.route}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{f.occupancy} occupants</p>
                  <p className={`text-xs font-medium ${f.status === "Evacuating" ? "text-stage-alert" : f.status === "Safe" ? "text-stage-safe" : "text-muted-foreground"}`}>
                    {f.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
            <span className="text-muted-foreground">Estimated Clearance Time</span>
            <span className="font-mono font-bold text-stage-alert">8 min 30 sec</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 space-y-3 shadow-sm">
            <h4 className="font-semibold text-foreground text-sm">Emergency Controls</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={`border-stage-critical/30 transition-all ${evacuationActive ? "bg-stage-critical text-white" : "text-stage-critical hover:bg-stage-critical/10"}`}
                onClick={handleEvacuation}
              >
                <Siren size={14} className="mr-1" /> {evacuationActive ? "Active" : "Trigger Evacuation"}
              </Button>
              <Button variant="outline" className="text-stage-danger border-stage-danger/30 hover:bg-stage-danger/10 transition-all" onClick={() => toast({ title: "Fire Department notified" })}>
                <Phone size={14} className="mr-1" /> Notify Fire Dept
              </Button>
              <Button variant="outline" className="text-stage-alert border-stage-alert/30 hover:bg-stage-alert/10 transition-all" onClick={() => toast({ title: "Elevators locked" })}>
                Lock Elevators
              </Button>
              <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/10 transition-all" onClick={() => toast({ title: "Emergency protocol activated" })}>
                Emergency Protocol
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-3 shadow-sm">
            <h4 className="font-semibold text-foreground text-sm">Emergency Communications</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={handleSendAlert} className="transition-all hover:shadow-sm">
                <Bell size={14} className="mr-1" /> Send Alert
              </Button>
              <Button variant="outline" size="sm" onClick={handleBroadcast} className="transition-all hover:shadow-sm">
                <Radio size={14} className="mr-1" /> Broadcast
              </Button>
              <Button variant="outline" size="sm" onClick={handleSMS} className="transition-all hover:shadow-sm">
                <MessageSquare size={14} className="mr-1" /> SMS Alert
              </Button>
              <Button variant="outline" size="sm" onClick={handleEmail} className="transition-all hover:shadow-sm">
                <Mail size={14} className="mr-1" /> Email Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvacuationModule;
