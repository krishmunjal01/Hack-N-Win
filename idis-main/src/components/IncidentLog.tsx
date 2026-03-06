import { Clock, AlertTriangle, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

const incidents = [
  { id: "INC-001", time: "12:01:23", type: "Sensor Spike", detail: "Temperature exceeded 60°C threshold", severity: "Critical" as const, riskScore: 88, disasterType: "Fire", sensorReadings: "Temp: 62°C, Gas: 580ppm" },
  { id: "INC-002", time: "11:58:45", type: "Gas Alert", detail: "Gas level reached 580 ppm", severity: "Dangerous" as const, riskScore: 72, disasterType: "Gas Leak", sensorReadings: "Gas: 580ppm, Temp: 48°C" },
  { id: "INC-003", time: "11:45:12", type: "Manual Note", detail: "Officer inspection: structural cracks observed on floor 3", severity: "Alert" as const, riskScore: 55, disasterType: "Structural", sensorReadings: "Vibration: 0.82g" },
  { id: "INC-004", time: "11:30:00", type: "Vibration Spike", detail: "Vibration sensor recorded 1.4g anomaly", severity: "Dangerous" as const, riskScore: 78, disasterType: "Earthquake", sensorReadings: "Vibration: 1.4g" },
  { id: "INC-005", time: "11:15:33", type: "System", detail: "Sensor node reconnected after brief offline period", severity: "Normal" as const, riskScore: 12, disasterType: "System", sensorReadings: "All nominal" },
  { id: "INC-006", time: "10:45:00", type: "Manual Note", detail: "Routine check completed. All exits verified clear.", severity: "Normal" as const, riskScore: 10, disasterType: "Inspection", sensorReadings: "All nominal" },
];

const severityColor: Record<string, string> = {
  Critical: "text-stage-critical border-stage-critical/30 bg-stage-critical/5",
  Dangerous: "text-stage-danger border-stage-danger/30 bg-stage-danger/5",
  Alert: "text-stage-alert border-stage-alert/30 bg-stage-alert/5",
  Normal: "text-stage-safe border-stage-safe/30 bg-stage-safe/5",
};

const IncidentLog = () => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("IDIS Incident Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.setLineWidth(0.5);
    doc.line(14, 33, 196, 33);

    let y = 42;
    incidents.forEach((inc) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${inc.id} — ${inc.type}`, 14, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      y += 6;
      doc.text(`Timestamp: ${inc.time}`, 14, y);
      y += 5;
      doc.text(`Severity: ${inc.severity} | Risk Score: ${inc.riskScore}`, 14, y);
      y += 5;
      doc.text(`Disaster Type: ${inc.disasterType}`, 14, y);
      y += 5;
      doc.text(`Sensor Readings: ${inc.sensorReadings}`, 14, y);
      y += 5;
      doc.text(`Detail: ${inc.detail}`, 14, y);
      y += 5;
      doc.text(`Stage: ${inc.severity}`, 14, y);
      y += 10;
    });

    doc.save("IDIS_Incident_Report.pdf");
    toast({ title: "PDF Downloaded", description: "Incident report saved as IDIS_Incident_Report.pdf" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileText size={18} className="text-primary" /> Incident Log
        </h3>
        <Button variant="outline" size="sm" onClick={downloadPDF}>
          <Download size={14} className="mr-1" /> Download PDF
        </Button>
      </div>
      <div className="space-y-2">
        {incidents.map((inc) => (
          <div key={inc.id} className={`rounded-md border p-3 transition-all card-hover ${severityColor[inc.severity] || ""}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {inc.severity === "Critical" || inc.severity === "Dangerous" ? (
                  <AlertTriangle size={14} />
                ) : (
                  <Clock size={14} />
                )}
                <span className="text-sm font-medium">{inc.type}</span>
                <span className="text-xs font-mono text-muted-foreground">{inc.id}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{inc.time}</span>
            </div>
            <p className="text-sm text-foreground/80">{inc.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentLog;
