import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { Building, fetchAllBuildings } from "@/data/mockData";
import BuildingCard from "@/components/BuildingCard";

const CityOverview = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    fetchAllBuildings().then(setBuildings);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="text-primary" size={28} />
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Integrated Disaster Intelligence System
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-10">City Control Center</p>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((b) => (
            <BuildingCard key={b.id} building={b} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityOverview;
