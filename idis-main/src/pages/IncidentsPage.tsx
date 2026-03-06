import IncidentLog from "@/components/IncidentLog";
import { FileText } from "lucide-react";

const IncidentsPage = () => {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="text-primary" size={24} />
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Incident Logs</h1>
          <p className="text-sm text-muted-foreground">System-wide incident timeline</p>
        </div>
      </div>
      <IncidentLog />
    </div>
  );
};

export default IncidentsPage;
