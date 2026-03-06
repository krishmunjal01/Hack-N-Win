import { useEffect, useState } from "react";
import { Building, fetchAllBuildings } from "@/data/mockData";
import BuildingCard from "@/components/BuildingCard";
import { Building2, Loader2 } from "lucide-react";

const BuildingsOverview = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllBuildings().then((b) => { setBuildings(b); setLoading(false); });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Building2 className="text-primary" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Building Monitoring System</h1>
          <p className="text-sm text-muted-foreground">All monitored buildings nationwide</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {buildings.map((b) => (
          <BuildingCard key={b.id} building={b} />
        ))}
      </div>
    </div>
  );
};

export default BuildingsOverview;
