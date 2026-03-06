import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockBuildings, getStageColor } from "@/data/mockData";

// Fix leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Building locations (mock for demo)
const buildingLocations: Record<string, [number, number]> = {
  building_a: [28.6139, 77.2090], // Delhi
  building_b: [19.0760, 72.8777], // Mumbai
  building_c: [13.0827, 80.2707], // Chennai
  building_d: [22.5726, 88.3639], // Kolkata
  building_e: [12.9716, 77.5946], // Bangalore
  building_f: [23.0225, 72.5714], // Ahmedabad
};

interface IndiaMapProps {
  center?: [number, number];
  zoom?: number;
  showOnly?: string[]; // building IDs to show
}

const IndiaMap = ({ center = [22.5, 78.9], zoom = 5, showOnly }: IndiaMapProps) => {
  const buildings = showOnly
    ? mockBuildings.filter((b) => showOnly.includes(b.id))
    : mockBuildings;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "350px" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {buildings.map((b) => {
        const pos = buildingLocations[b.id];
        if (!pos) return null;
        return (
          <Marker key={b.id} position={pos}>
            <Popup>
              <div className="text-sm space-y-1">
                <p className="font-bold">{b.name}</p>
                <p>Risk Stage: <strong style={{ color: getStageColor(b.stage) }}>{b.stage}</strong></p>
                <p>Temperature: {b.sensors.temperature}°C</p>
                <p>Gas Level: {b.sensors.gasLevel} ppm</p>
                <p>Vibration: {b.sensors.vibration}g</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default IndiaMap;
