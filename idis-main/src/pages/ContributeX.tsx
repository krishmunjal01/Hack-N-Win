import { useState, useRef, useCallback } from "react";
import { Globe, Upload, MapPin, Shield, Eye, EyeOff, Send, ArrowLeft, X, FileImage, Search, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const riskCategories = ["Fire Hazard", "Structural Damage", "Gas Leak", "Electrical Fault", "Water Damage", "Other"];

interface SubmittedReport {
  trackingId: string;
  buildingName: string;
  category: string;
  status: "submitted" | "under_review" | "assigned" | "resolved";
  submittedAt: string;
  assignedOfficer?: string;
  district?: string;
}

// Simulated report store
const reportStore: Record<string, SubmittedReport> = {};

// Seed some demo reports
reportStore["RPT-100234"] = {
  trackingId: "RPT-100234",
  buildingName: "Old Market Complex",
  category: "Structural Damage",
  status: "assigned",
  submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  assignedOfficer: "Officer Sharma",
  district: "Central Delhi",
};
reportStore["RPT-100112"] = {
  trackingId: "RPT-100112",
  buildingName: "Sunrise Apartments",
  category: "Fire Hazard",
  status: "under_review",
  submittedAt: new Date(Date.now() - 86400000).toISOString(),
  district: "South Mumbai",
};

function generateTrackingId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `RPT-${num}`;
}

// Map click handler component
const LocationPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  submitted: { label: "Submitted", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Clock },
  under_review: { label: "Under Review", color: "text-amber-600 bg-amber-50 border-amber-200", icon: AlertTriangle },
  assigned: { label: "Assigned to Officer", color: "text-primary bg-primary/5 border-primary/20", icon: CheckCircle },
  resolved: { label: "Resolved", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle },
};

const ContributeX = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    buildingName: "",
    address: "",
    category: "Fire Hazard",
    description: "",
    anonymous: false,
    reporterName: "",
    reporterPhone: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pinnedLocation, setPinnedLocation] = useState<[number, number] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [trackingInput, setTrackingInput] = useState("");
  const [trackedReport, setTrackedReport] = useState<SubmittedReport | null>(null);
  const [trackError, setTrackError] = useState("");
  const [lastTrackingId, setLastTrackingId] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/") || f.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...droppedFiles].slice(0, 5));
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setPinnedLocation([lat, lng]);
    toast({ title: "Location Pinned", description: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}` });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.buildingName || !form.address || !form.description) {
      toast({ title: "Missing Fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    const trackingId = generateTrackingId();
    const report: SubmittedReport = {
      trackingId,
      buildingName: form.buildingName,
      category: form.category,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      district: "Nearest District (Auto-assigned)",
    };

    reportStore[trackingId] = report;
    setLastTrackingId(trackingId);

    toast({
      title: "Report Submitted Successfully",
      description: `Tracking ID: ${trackingId}. Your report has been forwarded to the nearest district officer.`,
    });

    // Reset form
    setForm({ buildingName: "", address: "", category: "Fire Hazard", description: "", anonymous: false, reporterName: "", reporterPhone: "" });
    setFiles([]);
    setPinnedLocation(null);
    setShowMap(false);
  };

  const handleTrack = () => {
    setTrackedReport(null);
    setTrackError("");
    const id = trackingInput.trim().toUpperCase();
    if (!id) {
      setTrackError("Please enter a Report ID");
      return;
    }
    const report = reportStore[id];
    if (report) {
      setTrackedReport(report);
    } else {
      setTrackError("No report found with this ID. Please check and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="text-primary" size={22} />
            <span className="font-bold text-foreground">ContriButeX Initiative</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft size={14} className="mr-1" /> Home
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Report Unsafe Infrastructure</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Help protect your community. Report buildings or structures that pose safety risks. Your contribution directly enhances the nation's disaster preparedness.
          </p>
        </div>

        {/* Success banner */}
        {lastTrackingId && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-800">Report submitted! Your Tracking ID:</p>
              <p className="text-lg font-bold text-green-900 font-mono">{lastTrackingId}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setTrackingInput(lastTrackingId); setLastTrackingId(""); }}>
              Track It
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="font-bold text-foreground">Submit Report</h3>

            <div>
              <label className="text-sm font-medium text-foreground">Building / Structure Name *</label>
              <Input value={form.buildingName} onChange={(e) => setForm({ ...form, buildingName: e.target.value })} placeholder="e.g., XYZ Commercial Complex" className="mt-1" required />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Address / Location *</label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" className="mt-1" required />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Risk Category</label>
              <select
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {riskCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Description *</label>
              <textarea
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground min-h-[100px]"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue in detail..."
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Upload Evidence (Photos / Documents)</label>
              <div
                className={`rounded-md border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:border-primary/50"}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop images here, or click to select</p>
                <p className="text-xs text-muted-foreground mt-1">Accepts images & PDFs (max 5 files)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 rounded border border-border bg-muted/30 px-3 py-2 text-sm">
                      <FileImage size={16} className="text-primary shrink-0" />
                      <span className="truncate flex-1">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</span>
                      <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Geolocation Map */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Pin Building Location on Map</label>
              {!showMap ? (
                <div
                  className="rounded-md border border-dashed border-border bg-muted/20 p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setShowMap(true)}
                >
                  <MapPin size={20} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to open map and pin the building location</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="rounded-md overflow-hidden border border-border" style={{ height: "280px" }}>
                    <MapContainer center={[22.5, 78.9]} zoom={5} className="w-full h-full" scrollWheelZoom={true}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationPicker onLocationSelect={handleLocationSelect} />
                      {pinnedLocation && <Marker position={pinnedLocation} />}
                    </MapContainer>
                  </div>
                  {pinnedLocation ? (
                    <p className="text-xs text-primary font-medium">
                      📍 Location pinned: {pinnedLocation[0].toFixed(4)}, {pinnedLocation[1].toFixed(4)}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Click on the map to pin the building location</p>
                  )}
                </div>
              )}
            </div>

            {/* Anonymous toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`h-5 w-5 rounded border flex items-center justify-center ${form.anonymous ? "bg-primary border-primary" : "border-input"}`}
                onClick={() => setForm({ ...form, anonymous: !form.anonymous })}
              >
                {form.anonymous && <span className="text-primary-foreground text-xs">✓</span>}
              </button>
              <span className="text-sm text-foreground flex items-center gap-1">
                {form.anonymous ? <EyeOff size={14} /> : <Eye size={14} />}
                Report Anonymously
              </span>
            </div>

            {!form.anonymous && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Your Name</label>
                  <Input value={form.reporterName} onChange={(e) => setForm({ ...form, reporterName: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <Input value={form.reporterPhone} onChange={(e) => setForm({ ...form, reporterPhone: e.target.value })} className="mt-1" />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full gap-2">
              <Send size={14} /> Submit Report
            </Button>
          </form>

          {/* Side Info */}
          <div className="space-y-4">
            {/* Track Report */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h4 className="font-bold text-foreground mb-3 text-sm flex items-center gap-2">
                <Search size={14} /> Track Report Status
              </h4>
              <Input
                placeholder="Enter Report ID (e.g., RPT-100234)"
                className="mb-2 font-mono text-sm"
                value={trackingInput}
                onChange={(e) => { setTrackingInput(e.target.value); setTrackError(""); setTrackedReport(null); }}
              />
              <Button variant="outline" size="sm" className="w-full" onClick={handleTrack}>
                Track
              </Button>

              {trackError && (
                <p className="mt-3 text-xs text-destructive">{trackError}</p>
              )}

              {trackedReport && (
                <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 space-y-2">
                  <p className="text-xs font-mono text-muted-foreground">{trackedReport.trackingId}</p>
                  <p className="text-sm font-semibold text-foreground">{trackedReport.buildingName}</p>
                  <p className="text-xs text-muted-foreground">{trackedReport.category}</p>
                  {(() => {
                    const cfg = statusConfig[trackedReport.status];
                    const Icon = cfg.icon;
                    return (
                      <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border ${cfg.color}`}>
                        <Icon size={12} />
                        {cfg.label}
                      </div>
                    );
                  })()}
                  {trackedReport.assignedOfficer && (
                    <p className="text-xs text-foreground">Officer: <strong>{trackedReport.assignedOfficer}</strong></p>
                  )}
                  {trackedReport.district && (
                    <p className="text-xs text-muted-foreground">District: {trackedReport.district}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Submitted: {new Date(trackedReport.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* How it works */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h4 className="font-bold text-foreground mb-3 text-sm">How It Works</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-bold">1.</span> Submit your report with evidence</li>
                <li className="flex gap-2"><span className="text-primary font-bold">2.</span> Nearest district officer reviews</li>
                <li className="flex gap-2"><span className="text-primary font-bold">3.</span> Building added to IDIS monitoring</li>
                <li className="flex gap-2"><span className="text-primary font-bold">4.</span> Track status with your report ID</li>
              </ol>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
              <Shield className="text-primary mb-2" size={20} />
              <p className="text-sm text-foreground font-medium">Your identity is protected</p>
              <p className="text-xs text-muted-foreground mt-1">Anonymous reports are fully encrypted.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributeX;
